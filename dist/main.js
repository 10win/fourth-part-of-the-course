document.addEventListener("DOMContentLoaded", (() => {
    const t = document.querySelectorAll(".tabheader__item"), e = document.querySelectorAll(".tabcontent"),
        n = document.querySelector(".tabheader__items");

    function o() {
        e.forEach((t => {
            t.classList.add("hide"), t.classList.remove("show", "fade")
        })), t.forEach((t => {
            t.classList.remove("tabheader__item_active")
        }))
    }

    function s(n = 0) {
        e[n].classList.add("show", "fade"), e[n].classList.remove("hide"), t[n].classList.add("tabheader__item_active")
    }

    function a(t) {
        return t >= 0 && t < 10 ? `0${t}` : t
    }

    o(), s(), n.addEventListener("click", (e => {
        const n = e.target;
        n && n.classList.contains("tabheader__item") && t.forEach(((t, e) => {
            n == t && (o(), s(e))
        }))
    })), function (t, e) {
        const n = document.querySelector(".timer"), o = n.querySelector("#days"), s = n.querySelector("#hours"),
            r = n.querySelector("#minutes"), c = n.querySelector("#seconds"), i = setInterval(l, 1e3);

        function l() {
            const t = function (t) {
                let e, n, o, s;
                const a = Date.parse("2022-10-1") - Date.parse(new Date);
                return a <= 0 ? (e = 0, n = 0, o = 0, s = 0) : (e = Math.floor(a / 864e5), n = Math.floor(a / 36e5 % 24), o = Math.floor(a / 1e3 / 60 % 60), s = Math.floor(a / 1e3 % 60)), {
                    total: a,
                    days: e,
                    hours: n,
                    minutes: o,
                    seconds: s
                }
            }();
            o.innerText = a(t.days), s.innerText = a(t.hours), r.innerText = a(t.minutes), c.innerText = a(t.seconds), t.total <= 0 && clearInterval(i)
        }

        l()
    }();
    const r = document.querySelectorAll("[data-modal]"), c = document.querySelector(".modal");

    function i() {
        c.classList.toggle("show"), document.body.style.overflow = "hidden", clearInterval(d)
    }

    function l() {
        c.classList.toggle("show"), document.body.style.overflow = ""
    }

    r.forEach((t => {
        t.addEventListener("click", i)
    })), c.addEventListener("click", (t => {
        t.target !== c && "" != t.target.getAttribute("data-close") || l()
    })), document.addEventListener("keydown", (t => {
        "Escape" === t.code && c.classList.contains("show") && l()
    }));
    const d = setTimeout(i, 5e4);
    window.addEventListener("scroll", (function t() {
        window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 && (i(), window.removeEventListener("scroll", t))
    }));

    class u {
        constructor(t, e, n, o, s, a, ...r) {
            this.src = t, this.alt = e, this.title = n, this.descr = o, this.price = s, this.classes = r, this.parent = document.querySelector(a), this.transfer = 27, this.changeToUAH()
        }

        changeToUAH() {
            this.price = this.price * this.transfer
        }

        render() {
            const t = document.createElement("div");
            0 === this.classes.length ? (this.element = "menu__item", t.classList.add(this.element)) : this.classes.forEach((e => t.classList.add(e))), t.innerHTML = `\n                    <img src="${this.src}" alt="${this.alt}">\n                    <h3 class="menu__item-subtitle">${this.title}</h3>\n                    <div class="menu__item-descr">${this.descr}</div>\n                    <div class="menu__item-divider"></div>\n                    <div class="menu__item-price">\n                        <div class="menu__item-cost">Цена:</div>\n                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n                    </div>\n            `, this.parent.append(t)
        }
    }

    (async t => {
        const e = await fetch(t);
        if (!e.ok) throw new Error(`Could not fetch ${t}, status: ${e.status}`);
        return await e.json()
    })("http://localhost:3000/menu").then((t => {
        t.forEach((({img: t, alt: e, title: n, descr: o, price: s}) => {
            new u(t, e, n, o, s, ".menu .container").render()
        }))
    }));
    const m = document.querySelectorAll("form");

    function h(t) {
        const e = document.querySelector(".modal__dialog");
        e.classList.add("hide"), i();
        const n = document.createElement("div");
        n.classList.add("modal__dialog"), n.innerHTML = `\n            <div class="modal__content">\n                <div class="modal__close" data-close>×</div>\n                <div class="modal__title">${t}</div>\n            </div>\n        `, document.querySelector(".modal").append(n), setTimeout((() => {
            n.remove(), e.classList.add("show"), e.classList.remove("hide"), l()
        }), 4e3)
    }

    m.forEach((t => {
        var e;
        (e = t).addEventListener("submit", (t => {
            t.preventDefault();
            let n = document.createElement("img");
            n.src = "img/form/005 spinner.svg", n.style.cssText = "\n                display: block;\n                margin: 0 auto;\n            ", e.insertAdjacentElement("afterend", n);
            const o = new FormData(e);
            (async (t, e) => {
                const n = await fetch("http://localhost:3000/requests", {
                    method: "POST",
                    headers: {"Content-type": "application/json", charset: "utf-8"},
                    body: e
                });
                return await n.json()
            })(0, JSON.stringify(Object.fromEntries(o.entries()))).then((t => {
                console.log(t), h("Спасибо! Скоро мы с вами свяжемся"), n.remove()
            })).catch((() => {
                h("Что-то пошло не так...")
            })).finally((() => {
                e.reset()
            }))
        }))
    }));
    let g = 0, f = 1;
    const y = document.querySelectorAll(".offer__slide"), _ = document.querySelector(".offer__slider"),
        p = document.querySelector(".offer__slider-prev"), v = document.querySelector(".offer__slider-next"),
        x = document.querySelector("#total"), b = document.querySelector("#current"),
        E = document.querySelector(".offer__slider-wrapper"), S = window.getComputedStyle(E).width,
        L = document.querySelector(".offer__slider-inner");
    y.length < 10 ? (x.textContent = `0${y.length}`, b.textContent = `0${f}`) : (x.textContent = y.length, b.textContent = f), L.style.width = 100 * y.length + "%", L.style.display = "flex", L.style.transition = "0.5s all", E.style.overflow = "hidden", y.forEach((t => {
        t.style.width = S
    })), _.style.position = "relative";
    const w = document.createElement("ol"), q = [];
    w.classList.add("carousel-indicators"), w.style.cssText = "\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 15;\n        display: flex;\n        justify-content: center;\n        margin-right: 15%;\n        margin-left: 15%;\n        list-style: none;\n    ", _.append(w);
    for (let t = 0; t < y.length; t++) {
        const e = document.createElement("li");
        e.setAttribute("data-slide-to", t + 1), e.style.cssText = "\n            box-sizing: content-box;\n            flex: 0 1 auto;\n            width: 30px;\n            height: 6px;\n            margin-right: 3px;\n            margin-left: 3px;\n            cursor: pointer;\n            background-color: #fff;\n            background-clip: padding-box;\n            border-top: 10px solid transparent;\n            border-bottom: 10px solid transparent;\n            opacity: .5;\n            transition: opacity .6s ease;\n        ", 0 == t && (e.style.opacity = 1), w.append(e), q.push(e)
    }

    function A(t) {
        return +t.replace(/\D/g, "")
    }

    v.addEventListener("click", (() => {
        g == A(S) * (y.length - 1) ? g = 0 : g += A(S), L.style.transform = `translateX(-${g}px)`, f == y.length ? f = 1 : f++, y.length < 10 ? b.textContent = `0${f}` : b.textContent = f, q.forEach((t => t.style.opacity = ".5")), q[f - 1].style.opacity = 1
    })), p.addEventListener("click", (() => {
        0 == g ? g = A(S) * (y.length - 1) : g -= A(S), L.style.transform = `translateX(-${g}px)`, 1 == f ? f = y.length : f--, y.length < 10 ? b.textContent = `0${f}` : b.textContent = f, q.forEach((t => t.style.opacity = ".5")), q[f - 1].style.opacity = 1
    })), q.forEach((t => {
        t.addEventListener("click", (t => {
            const e = t.target.getAttribute("data-slide-to");
            f = e, g = A(S) * (e - 1), L.style.transform = `translateX(-${g}px)`, y.length < 10 ? b.textContent = `0${f}` : b.textContent = f, q.forEach((t => t.style.opacity = ".5")), q[f - 1].style.opacity = 1
        }))
    }));
    const $ = document.querySelector(".calculating__result span");
    let C, k, T, I, M;

    function D() {
        $.textContent = C && k && T && I && M ? "female" === C ? Math.round((447.6 + 9.2 * T + 3.1 * k - 4.3 * I) * M) : Math.round((88.36 + 13.4 * T + 4.8 * k - 5.7 * I) * M) : "____"
    }

    function j(t, e) {
        document.querySelectorAll(t).forEach((t => {
            t.classList.remove(e), t.getAttribute("id") === localStorage.getItem("sex") && t.classList.add(e), t.getAttribute("data-ratio") === localStorage.getItem("ratio") && t.classList.add(e)
        }))
    }

    function H(t, e) {
        const n = document.querySelectorAll(t);
        n.forEach((t => {
            t.addEventListener("click", (t => {
                t.target.getAttribute("data-ratio") ? (M = +t.target.getAttribute("data-ratio"), localStorage.setItem("ratio", +t.target.getAttribute("data-ratio"))) : (C = t.target.getAttribute("id"), localStorage.setItem("sex", t.target.getAttribute("id"))), n.forEach((t => {
                    t.classList.remove(e)
                })), t.target.classList.add(e), D()
            }))
        }))
    }

    function O(t) {
        const e = document.querySelector(t);
        e.addEventListener("input", (() => {
            switch (e.value.match(/\D/g) ? e.style.border = "1px solid red" : e.style.border = "none", e.getAttribute("id")) {
                case"height":
                    k = +e.value;
                    break;
                case"weight":
                    T = +e.value;
                    break;
                case"age":
                    I = +e.value
            }
            D()
        }))
    }

    localStorage.getItem("sex") ? C = localStorage.getItem("sex") : (C = "female", localStorage.setItem("sex", "female")), localStorage.getItem("ratio") ? M = localStorage.getItem("ratio") : (M = 1.375, localStorage.setItem("ratio", 1.375)), D(), j("#gender div", "calculating__choose-item_active"), j(".calculating__choose_big div", "calculating__choose-item_active"), H("#gender div", "calculating__choose-item_active"), H(".calculating__choose_big div", "calculating__choose-item_active"), O("#height"), O("#weight"), O("#age")
}));