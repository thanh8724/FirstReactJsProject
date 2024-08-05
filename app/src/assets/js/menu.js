
const dropMenus = document.querySelectorAll('.drop__menu');
dropMenus.forEach(menu => {
    menu.onmouseover = (e) => {
        const button_dropMenu = e.target.closest('li').querySelector('.button__drop--menu');
        const this_dropMenu =  e.target.closest('li').querySelector('ion-icon');
        button_dropMenu.style.color = 'orangered';
        this_dropMenu.style.transform = 'rotate(180deg)';
    }
    menu.onmouseout = (e) => {
        const button_dropMenu = e.target.closest('li').querySelector('.button__drop--menu');
        const this_dropMenu =  e.target.closest('li').querySelector('ion-icon');
        button_dropMenu.style.color = 'black';
        this_dropMenu.style.transform = 'rotate(0)';
    }
});
const drop__menuUls = document.querySelectorAll('.drop__menu--ul');
drop__menuUls.forEach(element => {
    const linkedOfUls = element.querySelectorAll('a');
    linkedOfUls.forEach(tag_a => {
        tag_a.onmouseover = (e) => {
            const button_dropMenu = e.target.closest('.drop__menu').closest('li').querySelector('.button__drop--menu');
            const this_dropMenu =  e.target.closest('.drop__menu').closest('li').querySelector('ion-icon');
            button_dropMenu.style.color = 'orangered';
            this_dropMenu.style.transform = 'rotate(180deg)';
        }
        tag_a.onmouseout = (e) => {
            const button_dropMenu = e.target.closest('.drop__menu').closest('li').querySelector('.button__drop--menu');
            const this_dropMenu =  e.target.closest('li').querySelector('ion-icon');
            button_dropMenu.style.color = 'black';
            this_dropMenu.style.transform = 'rotate(0)';
        }
    });
});