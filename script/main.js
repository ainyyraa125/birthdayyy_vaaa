
window.addEventListener("load", () => {
    const song = document.querySelector(".song");
    const gallery = document.querySelector(".memories");
    const replay = document.querySelector("#replay");

    // Sembunyikan galeri sebelum animasi dimulai
    if (gallery) {
        gsap.set(gallery, {
            autoAlpha: 0,
            display: "none"
        });
    }

    // Tampilkan konfirmasi musik
    Swal.fire({
        title: "Do you want to play music in the background?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then(async (result) => {
        if (result.isConfirmed && song) {
            try {
                song.volume = 0.5;
                await song.play();
            } catch (error) {
                console.warn("Musik tidak dapat diputar:", error);
            }
        }

        animationTimeline();
    });

    function animationTimeline() {
        const container = document.querySelector(".container");
        const chatbox = document.querySelector(".hbd-chatbox");
        const birthday = document.querySelector(".wish-hbd");

        if (!container || !chatbox || !birthday) {
            console.error("Periksa elemen HTML animasi ulang tahun.");
            return;
        }

        // Pecah teks menjadi huruf untuk animasi
        function splitLetters(element) {
            if (element.dataset.split === "true") return;

            const text = element.textContent;
            element.replaceChildren();

            [...text].forEach((char) => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char;
                element.appendChild(span);
            });

            element.dataset.split = "true";
        }

        splitLetters(chatbox);
        splitLetters(birthday);

        // Pastikan halaman siap dianimasikan
        gsap.set(container, { autoAlpha: 1 });
        gsap.set(".memories", { autoAlpha: 0, display: "none" });

        const tl = gsap.timeline();

        // Pembukaan
        tl.from(".one", {
            opacity: 0,
            y: 20,
            duration: 0.8
        })
        .from(".two", {
            opacity: 0,
            y: 15,
            duration: 0.5
        })
        .to(".one, .two", {
            opacity: 0,
            y: -15,
            duration: 0.6
        }, "+=3")

        // Ucapan ulang tahun
        .from(".three", {
            opacity: 0,
            y: 20,
            duration: 0.7
        })
        .to(".three", {
            opacity: 0,
            y: -15,
            duration: 0.6
        }, "+=2.5")

        // Pesan panjang
        .from(".four", {
            scale: 0.85,
            opacity: 0,
            duration: 0.8
        })
        .from(".fake-btn", {
            scale: 0.7,
            opacity: 0,
            duration: 0.4
        }, "<")
        .from(".hbd-chatbox span", {
            autoAlpha: 0,
            stagger: 0.015,
            duration: 0.1
        }, "+=0.3")
        .to(".fake-btn", {
            backgroundColor: "rgb(127, 206, 248)",
            duration: 0.3
        }, "+=1.5")
        .to(".four", {
            scale: 0.9,
            y: -40,
            opacity: 0,
            duration: 0.6
        }, "+=1")

        // Ide dan harapan
        .from(".idea-1", {
            opacity: 0,
            y: 25,
            duration: 0.8
        })
        .to(".idea-1", {
            opacity: 0,
            y: -20,
            duration: 0.6
        }, "+=4")

        .from(".idea-2", {
            opacity: 0,
            y: 25,
            duration: 0.8
        })
        .to(".idea-2", {
            opacity: 0,
            y: -20,
            duration: 0.6
        }, "+=3")

        .from(".idea-3", {
            opacity: 0,
            scale: 0.5,
            duration: 0.8
        })
        .to(".idea-3 strong", {
            scale: 1.15,
            color: "#ff69b4",
            duration: 0.5
        }, "<")

        .to(".idea-3", {
            opacity: 0,
            y: -20,
            duration: 0.6
        }, "+=3")

        // Foto dan ucapan utama
        .from(".profile-picture", {
            opacity: 0,
            scale: 0.6,
            y: 30,
            stagger: 0.25,
            duration: 0.8
        })
        .from(".wish-hbd span", {
            opacity: 0,
            y: -35,
            rotation: 15,
            stagger: 0.08,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.2")
        .from(".wish h5", {
            opacity: 0,
            y: 15,
            duration: 0.6
        }, "-=0.2")

        // Balon terbang
        .fromTo(".baloons img", {
            y: 500,
            opacity: 0
        }, {
            y: -900,
            opacity: 1,
            stagger: 0.12,
            duration: 5,
            ease: "power1.out"
        }, "-=1.5")

        // Efek lingkaran dekoratif
        .fromTo(".eight svg", {
            scale: 0,
            opacity: 0
        }, {
            scale: 1,
            opacity: 0.8,
            stagger: 0.15,
            duration: 0.5,
            repeat: 1,
            yoyo: true
        }, "-=3")

        // Penutup
        .from(".nine p", {
            opacity: 0,
            y: 20,
            stagger: 0.8,
            duration: 0.8
        })
        .from(".last-smile", {
            rotation: -45,
            scale: 0.5,
            opacity: 0,
            duration: 0.5
        })

        // Tampilkan galeri setelah animasi selesai
        .call(() => {
            if (gallery) {
                gsap.set(gallery, { display: "block" });

                gsap.fromTo(gallery, {
                    autoAlpha: 0,
                    y: 30
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });

        // Replay seluruh animasi
        if (replay && !replay.dataset.listenerAdded) {
            replay.dataset.listenerAdded = "true";
            replay.style.cursor = "pointer";

            replay.addEventListener("click", () => {
                if (gallery) {
                    gsap.set(gallery, {
                        autoAlpha: 0,
                        display: "none"
                    });
                }

                tl.restart();
            });
        }
    }
});
