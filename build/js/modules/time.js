const blockDiscipline = document.querySelector('.discipline');

if(blockDiscipline) {
  const timesCheck = blockDiscipline.querySelectorAll('[data-time]');

  const getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);

  //Функция подсчета рабочего времени
  const countTimeWorked =(firstDate, secondDate) => {
    const different = (getDate(secondDate) - getDate(firstDate));

    let differentRes;
    let hours;
    let minuts;

    if(different > 0) {
      differentRes = different;
      hours = Math.floor((differentRes % 86400000) / 3600000) -1;
      minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
    } else {
      differentRes = Math.abs(( getDate(firstDate) -  getDate(secondDate)));
      hours = Math.floor(24 - (differentRes % 86400000) / 3600000) -1;
      minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
    }

    hours.toString().length === 1 ? hours = `0${hours  }` :  hours = `${hours  }`;

    minuts.toString().length === 1 ? minuts = `0${minuts  }` :  minuts = `${minuts  }`;

    const result = `${hours}:${minuts}`;

    return result;
  };

  //Функция для определения разницы между нормой начала/окончания рабочего времени и фактическим приходом/уходом сотрудника
  const countTimeDifferent =(firstDate, secondDate) => {
    const different = (getDate(secondDate) - getDate(firstDate));
    const minuts = Math.round(((different % 86400000) % 3600000) / 60000);

    let hours;
    let result;


    if ( different > 0 ) {
      hours = Math.floor((different % 86400000) / 3600000);
      +hours !== 0 ? result=`+${hours}ч ${minuts}мин`: result=`+${minuts}мин`;

    } else if (different < 0 ) {
      hours = Math.ceil((different % 86400000) / 3600000);
      +hours !== 0 ? result=`${hours}ч ${-minuts}мин`: result=`${minuts}мин`;

    } else {
      result = '-';
    }
    return result;
  };

  timesCheck.forEach((timeCheck) => {
    const TIME_START_STANDARD = '08:00';
    const TIME_END_STANDARD = '17:00';

    const timeStart = timeCheck.querySelector('[data-time-start]').textContent;
    const timeEnd = timeCheck.querySelector('[data-time-end]').textContent;
    const timeWorked = timeCheck.querySelector('.discipline__description--working-hours');
    const timeWorkedStartChange = timeCheck.querySelector('.discipline__change--start');
    const timeWorkedEndChange = timeCheck.querySelector('.discipline__change--end');

    //Получить рабочее время
    const timeResult= countTimeWorked(timeStart, timeEnd);

    timeWorked.textContent = timeResult;

    (+timeResult.split(':')[0] >= 8) ? timeWorked.classList.add('discipline__description--hours-full') :  timeWorked.classList.add('discipline__description--hours-part');

    //Получить разницу по времени по приходу
    const timeStartChange= countTimeDifferent(TIME_START_STANDARD, timeStart);

    timeWorkedStartChange.textContent = timeStartChange;

    timeStartChange.startsWith('+') ? timeWorkedStartChange.classList.add('discipline__change--up') : timeWorkedStartChange.classList.add('discipline__change--down');

    //Получить разницу по времени по уходу
    const timeEndChange= countTimeDifferent(TIME_END_STANDARD,timeEnd);

    timeWorkedEndChange.textContent = timeEndChange;

    timeEndChange.startsWith('+') ?  timeWorkedEndChange.classList.add('discipline__change--down') :  timeWorkedEndChange.classList.add('discipline__change--up');
  });
}
