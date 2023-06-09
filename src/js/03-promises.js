import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', submitedForm);

function submitedForm(event) {
  event.preventDefault();

  let delay = form.delay.value;
  delay = Number(delay);
  let step = form.step.value;
  step = Number(step);
  let amount = form.amount.value;
  //let promises = createPromise;

  if (delay < 0 || step < 0 || amount <= 0) {
    Notiflix.Notify.warning('Please, enter a proper value');
    return;
  }
  for (let i = 1; i <= amount; i += 1) {
    let position = i;
    createPromise(position, delay)
      .then(() => position, (delay += step))
      .catch();
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        res(console.log(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        rej(console.log(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}
