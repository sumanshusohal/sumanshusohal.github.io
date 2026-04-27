(function () {
    var bootOverlay = document.getElementById("boot-overlay");
    var cursorGlow = document.getElementById("cursor-glow");
    var revealItems = document.querySelectorAll(".reveal");
    var navLinks = document.querySelectorAll(".main-nav a");
    var sectionTargets = document.querySelectorAll("main section[id]");
    var tiltCards = document.querySelectorAll(".tilt-card");

    window.setTimeout(function () {
        if (bootOverlay) {
            bootOverlay.classList.add("is-hidden");
        }
    }, 2900);

    if (cursorGlow) {
        window.addEventListener("pointermove", function (event) {
            cursorGlow.style.opacity = "1";
            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";
        });

        window.addEventListener("pointerleave", function () {
            cursorGlow.style.opacity = "0";
        });
    }

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16 });

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });

        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(function (link) {
                    link.classList.remove("is-active");
                    if (link.getAttribute("href") === "#" + entry.target.id) {
                        link.classList.add("is-active");
                    }
                });
            });
        }, { threshold: 0.35, rootMargin: "-10% 0px -55% 0px" });

        sectionTargets.forEach(function (section) {
            navObserver.observe(section);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    tiltCards.forEach(function (card) {
        card.addEventListener("pointermove", function (event) {
            var rect = card.getBoundingClientRect();
            var x = (event.clientX - rect.left) / rect.width - 0.5;
            var y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.transform =
                "perspective(900px) rotateX(" + (-y * 4) + "deg) rotateY(" + (x * 6) + "deg) translateY(-4px)";
        });

        card.addEventListener("pointerleave", function () {
            card.style.transform = "";
        });
    });
})();
