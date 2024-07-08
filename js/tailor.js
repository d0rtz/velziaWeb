const nav1 = document.getElementById('section4-nav1');
const nav2 = document.getElementById('section4-nav2');
const nav3 = document.getElementById('section4-nav3');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const subline1 = document.getElementById('subline1');
const subline2 = document.getElementById('subline2');
const subline3 = document.getElementById('subline3');
const content1 = document.getElementById('section4-content1');
const content2 = document.getElementById('section4-content2');
const content3 = document.getElementById('section4-content3');


nav1.addEventListener('click', () => {
    if(!line1.classList.contains('nav-line-active')){
        line1.classList.remove('nav-line-active') || line1.classList.remove('nav-line-inactive');
        line2.classList.remove('nav-line-active') || line2.classList.remove('nav-line-inactive');
        line3.classList.remove('nav-line-active') || line3.classList.remove('nav-line-inactive');
        line1.classList.add('nav-line-active');
        line2.classList.add('nav-line-inactive');
        line3.classList.add('nav-line-inactive');
        subline1.classList.remove('line-active') || subline1.classList.remove('line-inactive');
        subline2.classList.remove('line-active') || subline2.classList.remove('line-inactive');
        subline3.classList.remove('line-active') || subline3.classList.remove('line-inactive');
        subline1.classList.add('line-active');
        subline2.classList.add('line-inactive');
        subline3.classList.add('line-inactive');
        content1.style.display = 'grid';
        content2.style.display = 'none';
        content3.style.display = 'none';
    }
})
nav2.addEventListener('click', () => {
    if(!line2.classList.contains('nav-line-active')){
        line1.classList.remove('nav-line-active') || line1.classList.remove('nav-line-inactive');
        line2.classList.remove('nav-line-active') || line2.classList.remove('nav-line-inactive');
        line3.classList.remove('nav-line-active') || line3.classList.remove('nav-line-inactive');
        line2.classList.add('nav-line-active');
        line1.classList.add('nav-line-inactive');
        line3.classList.add('nav-line-inactive');
        subline1.classList.remove('line-active') || subline1.classList.remove('line-inactive');
        subline2.classList.remove('line-active') || subline2.classList.remove('line-inactive');
        subline3.classList.remove('line-active') || subline3.classList.remove('line-inactive');
        subline2.classList.add('line-active');
        subline1.classList.add('line-inactive');
        subline3.classList.add('line-inactive');
        content2.style.display = 'grid';
        content1.style.display = 'none';
        content3.style.display = 'none';
    }
})
nav3.addEventListener('click', () => {
    if(!line3.classList.contains('nav-line-active')){
        line1.classList.remove('nav-line-active') || line1.classList.remove('nav-line-inactive');
        line2.classList.remove('nav-line-active') || line2.classList.remove('nav-line-inactive');
        line3.classList.remove('nav-line-active') || line3.classList.remove('nav-line-inactive');
        line3.classList.add('nav-line-active');
        line2.classList.add('nav-line-inactive');
        line1.classList.add('nav-line-inactive');
        subline1.classList.remove('line-active') || subline1.classList.remove('line-inactive');
        subline2.classList.remove('line-active') || subline2.classList.remove('line-inactive');
        subline3.classList.remove('line-active') || subline3.classList.remove('line-inactive');
        subline3.classList.add('line-active');
        subline2.classList.add('line-inactive');
        subline1.classList.add('line-inactive');
        content3.style.display = 'grid';
        content2.style.display = 'none';
        content1.style.display = 'none';
    }
})