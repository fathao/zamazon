department
id, name, over_head_costs


SELECT
  department.id AS department_id,
  department.name AS department_name,
  SUM(department.over_head_costs) AS over_head_costs,
  SUM(product.product_sales) AS prodcut_sales,
  (product_sales - over_head_costs) AS total_profit
FROM department INNER JOIN product
  ON (department.name = product.department_name)
GROUP BY department_name
