/**
 * @description 右键菜单
 * @param {*} options
 * options: {
 *  menus: [{
 *    name: string, // 菜单名称
 *    onClick: Function // 菜单点击回调
 *  }]
 * }
 * @returns
 */
let y = 0;
class ContextMenu {
    constructor(options) {
        this.instance = null;
        this.options = options;
    }
    createMenu() {
        const ul = document.createElement("ul");
        ul.classList.add("custom-context-menu");
        const menus = this.options;
        if (menus && menus.length > 0) {
            for (const menu of menus) {
                const li = document.createElement("li");
                li.style.padding = "10px 30px";
                li.textContent = menu.name;
                li.onclick = menu.onClick;
                ul.appendChild(li);
            }
        }
        const body = document.querySelector("body");
        body.appendChild(ul);
        return ul;
    }
    getInstance() {
        if (!this.instance) {
            this.instance = this.createMenu();
        }
        return this.instance;
    }
    showMenu(e) {
        const menus = this.getInstance();
        console.log(menus);
        const mobileViewEl = document.getElementById("mobileView");
        const { width, left } = mobileViewEl.getBoundingClientRect();
        const x = width + left + 20;
        y = ((e && e.clientY) - 50 || y);
        menus.style.top = `${y}px`;
        menus.style.left = `${x}px`;
        menus.style.display = "block";
    }
    hideMenu() {
        const menus = this.getInstance();
        menus.style.display = "none";
    }
}

export default ContextMenu;
