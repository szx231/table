import './style.css';
import './data';
import { getApiResource } from './api/network';
import { URL } from './api/constant';

let data = [];

let dataSliceStart = 0;
let items_count = 40;
const AMOUNT_FIELDS = 6;

const THEAD = document.querySelector('thead');
const TBODY = document.querySelector('tbody');
const INPUT = document.querySelector('.search__input');
const SEARCH_BTN_CLEAR = document.querySelector('.search__button');
const NOT_FOUND = document.querySelector('.notFound');
const WRAPPER = document.querySelector('.wrapper');

const getData = (URL) => {
  getApiResource(URL).then((response) => {
    createTableHeader(response);
    createTableBody(response);
    data = response;
  });
};

getData(URL);

const tableIsEmpty = () => {
  NOT_FOUND.classList.remove('notFound__show');
  const itemsCount = document.querySelectorAll('.tbody__tr').length;
  let itemsHideCount = [];
  document.querySelectorAll('.tbody__tr').forEach((el) => {
    const isItems = el.classList.contains('item__hide');
    if (isItems) itemsHideCount.push(true);
  });
  if (itemsCount === itemsHideCount.length) {
    NOT_FOUND.classList.add('notFound__show');
  }
  itemsHideCount = [];
};

const lazyLoadingUsers = () => {
  if (WRAPPER.scrollHeight - (WRAPPER.scrollTop + window.innerHeight) < 100) {
    dataSliceStart = items_count;
    items_count += 10;
    createTableBody(data);
  }
};

WRAPPER.addEventListener('scroll', lazyLoadingUsers);

const search = () => {
  document.querySelectorAll('.tbody__tr').forEach((el) => {
    el.classList.remove('item__hide');
    const cellName = el.childNodes[3];
    const item = cellName.innerText.toLowerCase();
    const inputLowerCase = INPUT.value.toLowerCase().trim();

    if (!item.includes(inputLowerCase)) {
      el.classList.add('item__hide');
    }
  });
  tableIsEmpty();
  showInputClearBtn();
};

const showInputClearBtn = () => {
  if (INPUT.value.length > 0) {
    SEARCH_BTN_CLEAR.classList.add('hidde__btn');
  } else {
    SEARCH_BTN_CLEAR.classList.remove('hidde__btn');
  }
};

const clearInput = () => {
  INPUT.value = '';
  search();
};

INPUT.addEventListener('keyup', search);
SEARCH_BTN_CLEAR.addEventListener('click', clearInput);

const createTableHeader = (data) => {
  const dataKeys = Object.keys(data[0]);

  dataKeys.forEach((cellTitle, index) => {
    if (index < AMOUNT_FIELDS) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.innerHTML = `${cellTitle}`;
      const item = tr.appendChild(td);
      item.classList.add('header__tr');
      THEAD.appendChild(item);
    }
  });
};

const createTableBody = (data) => {
  data.slice(dataSliceStart, items_count).forEach((el, index) => {
    if (index < items_count) {
      const list = [];
      Object.values(el).forEach((el, index) => {
        if (index < AMOUNT_FIELDS) {
          const td = document.createElement('td');
          const item = typeof el === 'number' ? Math.round(el) : el;
          td.innerHTML = `${item}`;
          list.push(td);
        }
      });
      const tr = document.createElement('tr');
      list.forEach((el) => {
        tr.appendChild(el);
      });
      tr.classList.add('tbody__tr');
      TBODY.appendChild(tr);
    }
  });
};
