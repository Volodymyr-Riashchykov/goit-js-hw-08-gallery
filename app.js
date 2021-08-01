const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');

function strElGallery(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `
            <li class = "gallery__item">
                <a class = "gallery__link" href = "#">
                    <img class = "gallery__image" src = "${preview}" alt = "${description}" data-source = "${original}"/>
                </a>
            </li>
        `
    }).join('')
}

galleryEl.insertAdjacentHTML('beforeend', strElGallery(galleryItems));

let currentImg = 0;

galleryEl.addEventListener('click', onModalOpen)
lightboxEl.addEventListener('click', onModalClose)

function onModalOpen(e) {
    if (!e.target.classList.contains('gallery__image')) { return }
    openModal(e.target)
}

function openModal(current) {
    window.addEventListener('keydown', onKeyPress)
    currentImg = current;
    lightboxImageEl.attributes['src'].value = current.dataset.source;
    lightboxImageEl.attributes['alt'].value = current.attributes['alt'].value;
    lightboxEl.classList.add('is-open')
}

function onModalClose(e) {
    if (e.target.dataset.action !== ('close-lightbox')
        && !e.target.classList.contains('lightbox__overlay')) { return }
    closeModal();
}

function closeModal() {
    window.removeEventListener('keydown', onKeyPress)
    lightboxImageEl.attributes['src'].value = '';
    lightboxImageEl.attributes['alt'].value = '';
    lightboxEl.classList.remove('is-open')
    // return currentImg;
 }

function onKeyPress(e) {
    switch (e.keyCode) {
        case 27:
            closeModal()
            break;
        
         case 39:
            closeModal();
            let neighborRightEl = currentImg.closest('.gallery__item').nextElementSibling;
            if(neighborRightEl === null){neighborRightEl = galleryEl.firstElementChild;}
            const nextImg = neighborRightEl.querySelector('img');
            openModal(nextImg)
            break;
        
        case 37:
            closeModal();
            let neighborLeftEl = currentImg.closest('.gallery__item').previousElementSibling;
            if(neighborLeftEl === null){neighborLeftEl = galleryEl.lastElementChild;}
            const prevImg = neighborLeftEl.querySelector('img');
            openModal(prevImg)
            break;
        
        default:
            break;
    }
    
}