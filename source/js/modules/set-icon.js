const blockUsers = document.querySelector('.users');
const blockSites = document.querySelector('.sites');


if(blockUsers) {
  const elementsQuantity = blockUsers.querySelectorAll('.users__quantity');

  elementsQuantity.forEach((elementQuantity) => {
    const quantity = +elementQuantity.textContent;

    if(quantity === 0) {
      const blockQuantity = elementQuantity.closest('td');

      const iconQuantity = blockQuantity.querySelector('.users__icon');
      iconQuantity.classList.add('users__icon--null');
    }
  });
}

if(blockSites) {
  const  blocksPercent =  blockSites.querySelectorAll('.sites__percent');

  blocksPercent.forEach((blockPercent) => {
    const quantityIncidents = blockPercent.querySelector('.sites__text');
    const iconUp = blockPercent.querySelector('.sites__icon--up');
    const iconDown = blockPercent.querySelector('.sites__icon--down');

    const quantity = quantityIncidents.textContent;

    quantity.startsWith('+') ? iconUp.classList.add('sites__icon--active') : iconDown.classList.add('sites__icon--active');
  });
}
