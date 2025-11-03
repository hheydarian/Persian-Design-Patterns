/**
 * سیستم ناوبری بین صفحات الگوها
 * Navigation system for pattern pages
 */

// مسیر یادگیری پیشنهادی - به ترتیب اولویت
const learningPath = [
    // مبتدی
    { folder: "Singleton", title: "Singleton", category: "مبتدی", icon: "👑" },
    {
        folder: "Factory-Method",
        title: "Factory Method",
        category: "مبتدی",
        icon: "🏭",
    },
    { folder: "Builder", title: "Builder", category: "مبتدی", icon: "👷" },
    { folder: "Adapter", title: "Adapter", category: "مبتدی", icon: "🔌" },
    { folder: "Facade", title: "Facade", category: "مبتدی", icon: "🏛️" },

    // متوسط
    { folder: "Strategy", title: "Strategy", category: "متوسط", icon: "🎯" },
    { folder: "Observer", title: "Observer", category: "متوسط", icon: "👁️" },
    { folder: "Decorator", title: "Decorator", category: "متوسط", icon: "🎁" },
    { folder: "Command", title: "Command", category: "متوسط", icon: "🎮" },
    {
        folder: "Template-Method",
        title: "Template Method",
        category: "متوسط",
        icon: "📋",
    },

    // پیشرفته
    {
        folder: "Abstract-Factory",
        title: "Abstract Factory",
        category: "پیشرفته",
        icon: "🏗️",
    },
    {
        folder: "Prototype",
        title: "Prototype",
        category: "پیشرفته",
        icon: "🧬",
    },
    { folder: "Proxy", title: "Proxy", category: "پیشرفته", icon: "🛡️" },
    { folder: "Bridge", title: "Bridge", category: "پیشرفته", icon: "🌉" },
    {
        folder: "Composite",
        title: "Composite",
        category: "پیشرفته",
        icon: "🌳",
    },
    {
        folder: "Flyweight",
        title: "Flyweight",
        category: "پیشرفته",
        icon: "🪶",
    },
    {
        folder: "Chain-of-Responsibility",
        title: "Chain of Responsibility",
        category: "پیشرفته",
        icon: "🔗",
    },
    { folder: "Iterator", title: "Iterator", category: "پیشرفته", icon: "🔄" },
    { folder: "Mediator", title: "Mediator", category: "پیشرفته", icon: "🤝" },
    { folder: "Memento", title: "Memento", category: "پیشرفته", icon: "📸" },
    { folder: "State", title: "State", category: "پیشرفته", icon: "🎭" },
    { folder: "Visitor", title: "Visitor", category: "پیشرفته", icon: "👤" },
];

/**
 * دریافت موقعیت الگوی فعلی در مسیر یادگیری
 */
function getCurrentPatternIndex() {
    const currentPath = window.location.pathname;
    const currentFolder = currentPath
        .split("/")
        .filter(Boolean)
        .pop()
        .replace("index.html", "")
        .replace("/", "");

    // جستجو بر اساس نام پوشه
    const index = learningPath.findIndex((pattern) => {
        return currentPath.includes(pattern.folder);
    });

    return index;
}

/**
 * دریافت الگوی قبلی و بعدی
 */
function getNavigationPatterns() {
    const currentIndex = getCurrentPatternIndex();

    return {
        current: currentIndex !== -1 ? learningPath[currentIndex] : null,
        prev: currentIndex > 0 ? learningPath[currentIndex - 1] : null,
        next:
            currentIndex < learningPath.length - 1 && currentIndex !== -1
                ? learningPath[currentIndex + 1]
                : null,
    };
}

/**
 * ایجاد و درج دکمه‌های ناوبری
 */
function createNavigationButtons() {
    const { prev, next, current } = getNavigationPatterns();

    if (!current) {
        return; // اگر در صفحه الگو نباشیم، چیزی نمایش نده
    }

    const navHTML = `
        <div class="pattern-navigation">
            ${
                next
                    ? `
                <a href="../${next.folder}/index.html" class="nav-btn next">
                    <div class="nav-info">
                        <span class="nav-label">الگوی بعدی</span>
                        <span class="nav-title">${next.icon} ${next.title}</span>
                    </div>
                </a>
            `
                    : `
                <div class="nav-btn next disabled">
                    <div class="nav-info">
                        <span class="nav-label">الگوی بعدی</span>
                        <span class="nav-title">آخرین الگو</span>
                    </div>
                </div>
            `
            }
            
            ${
                prev
                    ? `
                <a href="../${prev.folder}/index.html" class="nav-btn prev">
                    <div class="nav-info">
                        <span class="nav-label">الگوی قبلی</span>
                        <span class="nav-title">${prev.icon} ${prev.title}</span>
                    </div>
                </a>
            `
                    : `
                <div class="nav-btn prev disabled">
                    <div class="nav-info">
                        <span class="nav-label">الگوی قبلی</span>
                        <span class="nav-title">اولین الگو</span>
                    </div>
                </div>
            `
            }
        </div>
    `;

    // افزودن ناوبری فقط در پایین محتوا
    const contentDiv = document.getElementById("content");
    if (contentDiv) {
        // ناوبری در پایین
        const bottomNav = document.createElement("div");
        bottomNav.innerHTML = navHTML;
        contentDiv.appendChild(bottomNav);
    }
}

// اجرای تابع بعد از بارگذاری محتوا
// ابتدا منتظر می‌مانیم تا محتوا بارگذاری شود
function initNavigation() {
    const contentDiv = document.getElementById("content");
    if (!contentDiv) {
        // اگر المان content وجود نداشت، بعداً تلاش کن
        setTimeout(initNavigation, 100);
        return;
    }

    // بعد از بارگذاری محتوا، ناوبری را اضافه کن
    const checkContentLoaded = () => {
        const contentDiv = document.getElementById("content");
        if (
            contentDiv &&
            (contentDiv.querySelector("section") ||
                contentDiv.textContent.includes("خطا"))
        ) {
            // محتوا بارگذاری شده یا خطا رخ داده
            createNavigationButtons();
        } else {
            // هنوز بارگذاری نشده، صبر کن
            setTimeout(checkContentLoaded, 200);
        }
    };

    checkContentLoaded();
}

// اجرای تابع
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavigation);
} else {
    initNavigation();
}
// کنترل نمایش و مخفی شدن نوبار هنگام اسکرول
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        navbar.classList.add("hidden"); // اسکرول به پایین → مخفی کن
    } else {
        navbar.classList.remove("hidden"); // اسکرول بالا → نمایش بده
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
