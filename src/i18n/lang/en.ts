export default {
  home: {
    market: "Market",
    loyalty: "LP Store",
    wiki: "Wiki",
    server: "Tranquility",
    appraisal: "Appraisal",
    desc: "EVE Starweb is a tool web designed to assist pilots navigating New Eden in EVE Online, " +
      "offering support for market, loyalty point store, and beginner wiki, available in multiple languages.",
  },
  header: {
    server: {
      Tranquility: "Tranquility",
      Serenity: "Serenity"
    },
    search: "Search",
    allRegions: "All Regions",
  },
  config: {
    form: {
      materialPrice: "Material Price",
      materialPlaceholder: "Please select type",
      productPrice: "Product Price",
      productPlaceholder: "Please select type",
      scope: "Average Price",
      scopePlaceholder: "Please select percentage",
      days: "Date Range",
      daysPlaceholder: "Please select date range",
      tax: "Tax",
      week: "7d",
      month: "30d",
      season: "90d",
      buyPrice: "Buy Price",
      sellPrice: "Sell Price",
    },
    tableForm: {
      title: "Table",
      calculator: "Calculator",
      calculatorPlaceholder: "Enable calculator or not",
      calculatorEnable: "Enable",
      calculatorDisable: "Disable",
      layout: "Table Layout",
      layoutPlaceholder: "Please select table layout",
      layoutAuto: "Auto",
      layoutFixed: "Fixed",
      highlight: "Highlight Row",
      highlightPlaceholder: "Enable highlight selected row or not",
      highlightEnable: "Enable",
      highlightDisable: "Disable",
    },
    desc: {
      title: "Description",
      dataDesc: "Data",
      tableDesc: "Column",
      blueprint: "Blueprint",
      materialContent: "Price type for required items and blueprint materials",
      productPriceContent: "Price type for LP store rewards",
      scopeContent: "Price calculation for all items. Extremely low-priced & high-volume buy orders are filtered out. And then the sell and buy prices are the average of the lowest or highest x% orders",
      daysContent: "The volume column in the table is the average of the total volume during the Date Range",
      taxContent: "Income and profit will be taxed according to this ratio",
      costContent: "Total cost of required items and blueprint materials",
      incomeContent: "Price of item price multiplied by quantity after tax",
      volumeContent: " Average volume on the Date Range",
      saleIndexContent: "This value is designed to prioritize items with high transaction and high ISK/LP. It's calculated by multiplying the scores of three indicators: daily ISK transaction, daily volume and ISK/LP",
      unitProfitContent: "ISK profit after tax per LP point",
      blueprintContent: "Blueprint price based on the outcome",
    },
    corporation: 'Please select or type corp',
    title: 'Configuration',
    data: "Data",
    quickBar: "Quickbar",
    description: "Description",
    quickbarTitle: "Quickbar",
    sourceList: "All",
    targetList: "Quickbar",
    close: "Close",
    reset: "Reset",
  },
  table: {
    name: "Item",
    quantity: "Quantity",
    lpCost: "LP Cost",
    iskCost: "ISK Cost",
    materialCost: "Material Cost",
    price: "Price",
    income: "Income",
    profit: "Profit",
    volume: "Volume",
    saleIndex: "Sales Index",
    unitProfit: "ISK/LP",
    lookUp: "Search",
    order: "Order",
    operation: "Operation",
    error: "Error",
    material: {
      lpStoreMaterial: "Required Items",
      bluePrintMaterial: "Blueprint Materials",
      name: "Item",
      quantity: "Quantity",
      price: "Price",
      type: "Type",
      cost: "Cost",
      error: "Error",
      copy: "Copy",
      copySuccess: "Copied!",
      copyFail: "Copy failed!",
      sum: "Sum",
    },
    err: {
      productBuy: "failed to get buy price for <b>$1</b>",
      productSell: "failed to get sell price for <b>$1</b>",
      materialBuy: "failed to get buy price for blueprint material <b>$1</b>",
      materialSell: "failed to get sell price for blueprint material <b>$1</b>",
      requirementBuy: "failed to get sell price for required item <b>$1</b>",
      requirementSell: "failed to get sell price for required item <b>$1</b>",
      buyOrder: "no buy order found in the market",
      sellOrder: "no sell order found in the market",
      order: "no order found in the market",
      sellPrice: "failed to get sell price",
      buyPrice: "failed to get buy price",
    },
  },
  calculator: {
    title: "Calculator",
    empty: "No row selected!",
    close: "Close",
    calculate: "Calculate",
    lpCost: "LP Cost",
    iskCost: "ISK Cost",
    materialCost: "Material Cost",
    profit: "Max Profit",
    unitProfit: "Max ISK/LP",
    reset: "Reset",
    materialList: "Material List",
  },
  order: {
    sellOrder: "Sellers",
    buyOrder: "Buyers",
    history: "History",
    orderId: "OrderId",
    systemName: "Location",
    volume: "Volume",
    price: "Price",
    unitProfit: "ISK/LP",
    expiration: "Expires In",
    lastUpdated: "Last Updated",
    statis: {
      lpRange: "ISK/LP Range",
      number: "Quantity",
      cost: "Cost",
      income: "Income",
      profit: "Profit",
      avgLpPrice: "Avg ISK/LP",
      unitProfit: "ISK/LP",
    },
  },
  history: {
    average: "Median Day Price",
    minAndmax: "Min/Max(d)",
    average5d: "Moving Avg(5d)",
    average20d: "Moving Avg(20d)",
    minAndmax5d: "Min/Max(5d)",
    volume: "Volume",
    price: "Price",
    location: "Location",
    rangeSelector: {
      month: "1m",
      threeMonths: "3m",
      halfYear: "6m",
      yearToDay: "YTD",
      year: "1y",
      all: "All",
    },
  },
  market: {
    browse: "Browse",
    quickbar: "Quickbar",
    quickbarAdd: "Add to quickbar",
    quickbarRemove: "Remove",
    quickbarDuplicate: "Already exists",
    quickbarImport: "Import quickbar from clipboard",
    quickbarExport: "Copy quickbar to clipboard",
    quickbarClear: "Reset quickbar",
    lookup: "Search",
    regionName: "Region",
    volumeRemain: "Quantity",
    price: "Price",
    locationName: "Location",
    jump: "Jump",
    expiration: "Expires In",
    lastUpdated: "Last Updated",
    sellOrder: "Sellers",
    buyOrder: "Buyers",
    history: "History",
    confirm: "Confirm",
    reset: "Reset",
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
    returnHome: "Return to Home",
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
    contact: 'If you encounter any bug or have any issue, please open an issue on <a href="https://github.com/jackdaw3/eve-starweb/issues">GitHub</a>.',
    returnHome: "Return to Home",
  },
  user: {
    login: "Log in",
    logout: "Log out",
    delete: "Delete account",
    deleteConfirm: "Are you sure you want to delete your account?",
    location: "Location",
    setDestination: "Set destination",
    addWaypoint: "Add Waypoint",
    autopilotSuccess: "In place!",
    autopilotFail: "Failed to set!",
  },
  appraisal:{
    button: "Appraisal",
    placeholder: "Paste the item list here, with the following example:\n\nTritanium 50000\nPyerite 10000\nMexallon 5000\nIsogen 1000" + 
    "\nNocxium 100\nZydrine 50\nMegacyte 10",
    submit: "Submit",
    name: "Item",
    quantity: "Quantity",
    volume: "Volume",
    sell: "Sell",
    buy: "Buy",
    price: "5% Average",
    total: "Total",
    volumeTotal: "Volume",
    sellTotal: "Sell total",
    buyTotal: "Buy total",
    sum: "Sum",
    copySuccess: "Copied!",
    copyFail: "Copy failed!",
    invalid: "Invalid text format!",
    empty: "No text!",
  }
}