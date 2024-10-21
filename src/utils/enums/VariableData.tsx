export const weekToMonth = [
  {
    id: 1,
    label: 'Week',
  },
  {
    id: 2,
    label: 'Month',
  },
];

export const incomeExpense = [
  {
    id: 1,
    label: 'Expense',
  },
  {
    id: 2,
    label: 'Income',
  },
];

export const IncomeSelected = [
  {
    id: 1,
    category: 'Salary',
  },
  {
    id: 2,
    category: 'Passive Income',
  },
];

export const ExpenseSelected = [
  {
    category: 'Shopping',
    id: 1,
  },
  {
    category: 'Subscription',
    id: 2,
  },
  {
    category: 'Food',
    id: 3,
  },
  {
    category: 'Transportation',
    id: 4,
  },
];
export const OnboardData = [
  {
    image: require('../../Image/onBoards/money.png'),
    title: 'Gain total control \n of your money',
    subs: 'Become your own money manager \n and make every cent count',
  },
  {
    image: require('../../Image/onBoards/deed.png'),
    title: 'Know where your \n money goes',
    subs: 'Track your transaction easily, \n with categories and financial report',
  },
  {
    image: require('../../Image/onBoards/plan.png'),
    title: 'Planning ahead',
    subs: 'Setup your budget for each category \n so you in control',
  },
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getColorForCategory = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'Shopping':
      return 'rgba(252, 238, 212, 1)';
    case 'Subscription':
      return 'rgba(238, 229, 255, 1)';
    case 'Food':
      return 'rgba(253, 213, 215, 1)';
    default:
      return 'rgba(189, 220, 255, 1)';
  }
};
export const getColorForCategorys = (category: string): string => {
  // You can create a mapping of colors or generate them dynamically
  const colorMapping = {
    Shopping: '#009FFF',
    Subscription: '#93FCF8',
    Insurance: '#BDB2FA',
    Food: '#FFA5BA',
    Entertainment: '#FFC300',
    Transportation: '#FF5733',
    // Add more categories and colors as needed
  };

  return colorMapping[category] || '#CCCCCC';
};

export const pieData = [
  {
    value: 47,
    color: '#009FFF',
    gradientCenterColor: '#006DFF',
    title: 'Shopping',
  },
  {
    value: 40,
    color: '#93FCF8',
    gradientCenterColor: '#3BE9DE',
    title: 'Subscription',
  },
  {
    value: 10,
    color: '#BDB2FA',
    gradientCenterColor: '#8F80F3',
    title: 'Insurance',
  },
  {
    value: 3,
    color: '#FFA5BA',
    gradientCenterColor: '#FF7F97',
    title: 'Food',
  },
];
