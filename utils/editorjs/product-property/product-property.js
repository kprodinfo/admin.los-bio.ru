export default class ProductProperty {
    static get toolbox() {
        return {
            title: 'Свойство товара',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M21 6H3a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zM15 11H3a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2zM9 16H3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2z" fill="#000000" opacity="1" data-original="#000000"></path></g></svg>'
        };
    }

    constructor({data}) {
        this.data = data;
    }

    render() {
        const wrapper = document.createElement("div");
        const nameBlock = document.createElement("div");
        const valueBlock = document.createElement("div");

        wrapper.classList.add("product-property");
        
        nameBlock.setAttribute("contenteditable", true);
        nameBlock.setAttribute("data-placeholder", "Название");
        nameBlock.classList.add("product-property__name");

        valueBlock.setAttribute("contenteditable", true);
        valueBlock.setAttribute("data-placeholder", "Значение");
        valueBlock.classList.add("product-property__value");

        wrapper.appendChild(nameBlock);
        wrapper.appendChild(valueBlock);

        nameBlock.textContent = this.data.name;
        valueBlock.textContent = this.data.value;

        // input.value = this.data && this.data.url ? this.data.url : '';
        return wrapper;
    }

    save(blockContent) {
        const name = blockContent.querySelector(".product-property__name");
        const value = blockContent.querySelector(".product-property__value");

        return {
            name: name.textContent,
            value: value.textContent
        }
    }
}
