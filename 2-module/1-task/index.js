function sumSalary(salaries) {
  let sumSalaries = 0;

  for (let key in salaries) {
    if ((typeof (salaries[key]) != 'number') ||
      Number.isNaN(salaries[key]) ||
      !Number.isFinite(salaries[key])) continue;
    sumSalaries += salaries[key];
  }

  return sumSalaries
}
