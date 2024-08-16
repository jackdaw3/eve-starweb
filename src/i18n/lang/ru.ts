export default {
    home: {
        market: "Рынок",
        loyalty: "LP Магазин",
        wiki: "Wiki",
        server: "Tranquility",
        appraisal: "Оценка",
        desc: "EVE Starweb - это веб-инструмент, разработанный для помощи пилотам в навигации по New Eden в EVE Online. " +
            "Он предлагает поддержку анализа рынка, магазина очков лояльности и вики для новичков, доступный на нескольких языках.",
    },
    header: {
        server: {
            Tranquility: "Tranquility",
            Serenity: "Serenity"
        },
        "search": "Поиск",
        "allRegions": "Все регионы",
    },
    config: {
        form: {
            materialPrice: "Цена материала",
            materialPlaceholder: "Пожалуйста выберите тип",
            productPrice: "Цена продукта",
            productPlaceholder: "Пожалуйста выберите тип",
            scope: "Средняя цена",
            scopePlaceholder: "Пожалуйста выберите взвешенный ценовой диапазон",
            days: "Срок сделки",
            daysPlaceholder: "Пожалуйста выберите диапазон дат",
            tax: "Налог",
            week: "7д",
            month: "30д",
            season: "90д",
            buyPrice: "Цена покупки",
            sellPrice: "Цена продажи",
        },
        tableForm: {
            title: "Таблица",
            calculator: "Калькулятор",
            calculatorPlaceholder: "Выберите, включить ли калькулятор",
            calculatorEnable: "Включить",
            calculatorDisable: "Выключить",
            layout: "Макет таблицы",
            layoutPlaceholder: "Пожалуйста, выберите макет таблицы",
            layoutAuto: "Адаптивный",
            layoutFixed: "Фиксированный",
            highlight: "Выделить строку",
            highlightPlaceholder: "Включить или нет выделение выбранной строки",
            highlightEnable: "Включить",
            highlightDisable: "Выключить",
        },
        desc: {
            title: "Описание",
            dataDesc: "Данные",
            tableDesc: "Столбец",
            blueprint: "Чертеж",
            materialContent: "Тип цены для необходимых предметов и материалов чертежа",
            productPriceContent: "Все типы цен на товары магазина LP",
            scopeContent: "Расчет цены всех продуктов, фильтрация заказов с экстремально низкой ценой и исключительно большим объемом. Цена покупки и продажи рассчитывается как средняя цена x% количества с самой низкой или самой высокой ценой",
            daysContent: "Среднедневный объем сделок в таблице - это среднее значение общего объема сделок за выбранный период",
            taxContent: "Доход и прибыль берутся после вычета этой ставки налога",
            costContent: "Общая стоимость необходимых предметов и материалов чертежа",
            incomeContent: "Цена товара умножается на цену после налогообложения",
            volumeContent: "Среднедневный объем сделок за cрок сделки",
            saleIndexContent: "Это значение используется для отображения товаров, которые легко продать и имеют высокий коэффициент ISK/LP. Оно получается путем умножения трех показателей: дневной суммы сделок, среднедневного объема сделок и доли ISK/LP",
            unitProfitContent: "Чистая прибыль в ISK на единицу LP после уплаты налогов",
            blueprintContent: "Цена чертежа в зависимости от результата",
        },
        corporation: 'Выберите или укажите компанию',
        title: 'Настройка',
        data: "Данные",
        quickBar: "Быстрая панель",
        description: "Описание",
        quickbarTitle: "Быстрая панель",
        sourceList: "Все компании",
        targetList: "Быстрая панель",
        close: "Закрыть",
        reset: "Сброс",
    },
    table: {
        name: "Название",
        quantity: "Количество",
        lpCost: "Ст. LP",
        iskCost: "Ст. ISK",
        materialCost: "Ст. матер",
        price: "Цена",
        income: "Доход",
        profit: "Прибыль",
        volume: "Объем",
        saleIndex: "Индекс Продаж",
        unitProfit: "ISK/LP",
        lookUp: "Поиск Название",
        order: "Заказ",
        operation: "Действия",
        error: "Ошибка",
        material: {
            lpStoreMaterial: "Необходимые предметы",
            bluePrintMaterial: "Минералы для чертежа",
            name: "Название",
            quantity: "Количество",
            price: "Цена",
            type: "Тип",
            cost: "Стоимость",
            error: "Ошибка",
            copy: "Скопируй",
            copySuccess: "Скопировано!",
            copyFail: "Не удалось скопировать!",
            sum: "Итого",
        },
        err: {
            productBuy: "Не удалось получить цену покупки <b>$1</b>",
            productSell: "Не удалось получить цену продажи <b>$1</b>",
            materialBuy: "Не удалось получить цену покупки материала <b>$1</b>",
            materialSell: "Не удалось получить цену продажи материала <b>$1</b>",
            requirementBuy: "Не удалось получить цену покупки необходимых предметов <b>$1</b>",
            requirementSell: "Не удалось получить цену продажи необходимых предметов <b>$1</b>",
            buyOrder: "На рынке нет покупных ордеров",
            sellOrder: "На рынке нет продажных ордеров",
            order: "На рынке нет ордеров",
            sellPrice: "Не удалось получить цену продажи",
            buyPrice: "Не удалось получить цену покупки",
        },
    },
    calculator: {
        title: "Калькулятор",
        empty: "Нет выбранных строк!",
        close: "Закрыть",
        calculate: "Считать",
        lpCost: "Ст. LP",
        iskCost: "Ст. ISK",
        materialCost: "Ст. матер",
        profit: "Макс прибыль",
        unitProfit: "Макс ISK/LP",
        reset: "Сброс",
        materialList: "Список материалов",
    },
    order: {
        sellOrder: "Продавцы",
        buyOrder: "Покупатели",
        history: "История цен",
        orderId: "Номер заказа",
        systemName: "Место",
        volume: "Объем",
        price: "Цена",
        unitProfit: "ISK/LP",
        expiration: "Истекает через",
        lastUpdated: "Посл. обн.",
        statis: {
            lpRange: "Диапазон ISK/LP",
            number: "Количество",
            cost: "Стоимость",
            income: "Доход",
            profit: "Прибыль",
            avgLpPrice: "Сред ISK/LP",
            unitProfit: "ISK/LP",
        },
    },
    history: {
        average: "Средняя цена за день",
        minAndmax: "Мин/Макс(д)",
        average5d: "движ среднее(5д)",
        average20d: "движ среднее(20д)",
        minAndmax5d: "Мин/Макс(5д)",
        volume: "Объем",
        price: "Цена",
        location: "Место",
        rangeSelector: {
            month: "1м",
            threeMonths: "3м",
            halfYear: "6м",
            yearToDay: "YTD",
            year: "1г",
            all: "Все",
        },
    },
    market: {
        browse: "Просмотр",
        quickbar: "Быстрая панель",
        quickbarAdd: "Добавить в Быстрая панель",
        quickbarRemove: "Удалить",
        quickbarDuplicate: "Уже существует",
        quickbarImport: "Импорт из буфера",
        quickbarExport: "Экспорт в буфер",
        quickbarClear: "Сброс панели",
        lookup: "Поиск Название",
        regionName: "Регион",
        volumeRemain: "Количество",
        price: "Цена",
        locationName: "Место",
        expiration: "Истекает через",
        lastUpdated: "Посл. обн.",
        sellOrder: "Продавец",
        buyOrder: "Покупатель",
        history: "История цен",
        confirm: "Подтвердить",
        reset: "Сбросить"
    },
    privacy: {
        privacy: "Privacy Policy",
        intro: "Introduction",
        local: "Local Storage",
        auth: "User Authentication",
        ga: "Google Analytics",
        introContent: "EVE Starweb is committed to protecting the privacy of visitors and users. This Privacy Policy outlines the collection, use, and safeguarding of " +
            "your personal information when interacting with this website. By accessing or using this website, you consent to the practices described in this Privacy Policy.",
        localContent: "Local storage is utilized to store user preferences such as quickbar and data configuarion. This data remains solely on your local device and is " +
            "not stored to any server.",
        authContent: 'Upon successful EVE SSO login, the website will obtain the below scopes, which will allow you to set waypoints and destinations on the market page, ' +
            'and display the number of jumps.<br><br>esi-location.read_location.v1<br>esi-ui.write_waypoint.v1<br><br>' +
            'The server will store user information and tokens, and utilize cookies to maintain the login status. All user data will be securely stored, and will never be ' +
            'used for any purposes other than those explicitly stated in this Privacy Policy.',
        gaContent: "Google Analytics is employed to gather anonymous usage data about website visitors. This information provides insights into website traffic patterns, " +
            "user engagement, and popular content. ",
        returnHome: "На главную",
    },
    faq: {
        faq: "FAQ",
        q1: "How often is the data refreshed?",
        q1Content: "Market and LP store share the same data, 7m for The Forge, 30m for A G M market centers, 1h for others.",
        q2: "How to use the quickbar?",
        q2Content: "Market menu works the same as in the game. Right-click to add it to the quickbar. <br> In LP store, select the corporation in the configuration shuttle" +
            " window. After that, a quickbar option will appear in the faction/corporation selection box.",
        q3: "What is the sales index?",
        q3Content: "The sales index is designed to prioritize items with high transaction and high ISK/LP.",
        q4: "What can I do after logging in?",
        q4Content: "After logging in, the jumps will be displayed in the matket table, and you can right-click on any row to set waypoints, destinations.",
        q5: "How to open multiple order pages in LP store?",
        q5Content: "Hold down the CTRL key on the keyboard, and then left-click on multiple [Order].",
        contact: 'If you encounter any bugs or have any suggestions, please open an issue on <a href="https://github.com/jackdaw3/eve-starweb/issues">GitHub</a>.',
        returnHome: "На главную",
    },
    user: {
        login: "Войти",
        logout: "Выйти",
        delete: "Удалить аккаунт",
        deleteConfirm: "Вы уверены, что хотите удалить свой аккаунт?",
        location: "Местоположение",
        setDestination: "Установить пункт назначения",
        addWaypoint: "Добавить путевую точку",
        autopilotSuccess: "Установлено!",
        autopilotFail: "Ошибка установки!"
    },
    appraisal:{
        button: "Оценка",
        placeholder: "Вставьте список предметов сюда, используя следующий пример:\n\nTritanium 50000\nPyerite 10000\nMexallon 5000\nIsogen 1000" + 
        "\nNocxium 100\nZydrine 50\nMegacyte 10",
        submit: "Отправить",
        name: "Предмет",
        quantity: "Количество",
        volume: "Объем",
        sell: "Продать",
        buy: "Купить",
        price: "Средняя 5%",
        total: "Итого",
        volumeTotal: "Общий объем",
        sellTotal: "Итого продажа",
        buyTotal: "Итого покупка",
        sum: "Сумма",
        copySuccess: "Скопировано!",
        copyFail: "Ошибка копирования!",
        invalid: "Неверный формат текста!",
        empty: "Нет текста!",
      }
}