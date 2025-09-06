<script setup lang="ts">
  import TableData from '@/components/TableData.vue';

  const titles = ["Order Id", "Order N", "Product name", "Type", "Quantity", "Delivery date" ];

  const listP = [
    ['2651726', '01', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '02', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '03', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Sachet', '5.500 units', '15/12/2023'],
    ['2651726', '04', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Sachet', '8.000 units', '15/12/2023'],
    ['2651726', '05', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '8.000 units', '15/12/2023'],
    ['2651726', '06', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '07', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '8.000 units', '15/12/2023'],
    ['2651726', '08', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '09', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '8.000 units', '15/12/2023'],
    ['2651726', '10', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '5.500 units', '15/12/2023'],
    ['2651726', '11', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '8.000 units', '15/12/2023'],
    /*['2651726', '12', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '13', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '14', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Sachet', '5.500 units', '15/12/2023'],
    ['2651726', '15', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Sachet', '8.000 units', '15/12/2023'],
    ['2651726', '16', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '8.000 units', '15/12/2023'],
    ['2651726', '17', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '18', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '8.000 units', '15/12/2023'],
    ['2651726', '19', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '20', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '8.000 units', '15/12/2023'],
    ['2651726', '21', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '5.500 units', '15/12/2023'],
    ['2651726', '22', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '8.000 units', '15/12/2023'],
    ['2651726', '23', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '24', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '25', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Sachet', '5.500 units', '15/12/2023'],
    ['2651726', '26', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Sachet', '8.000 units', '15/12/2023'],
    ['2651726', '27', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '8.000 units', '15/12/2023'],
    ['2651726', '28', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '29', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '8.000 units', '15/12/2023'],
    ['2651726', '30', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '5.500 units', '15/12/2023'],
    ['2651726', '31', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '8.000 units', '15/12/2023'],
    ['2651726', '32', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Doypack', '5.500 units', '15/12/2023'],
    ['2651726', '33', 'CALM YOUR MIND (PECTIN) GUMMIES', 'Bottle', '8.000 units', '15/12/2023']*/
  ]

</script>

<template>
  <div class="main-content" id="table">
    <TableData :title="titles" :data="listP" buttonText="Order" url="/iconbuttons/arrow-right-order.svg"></TableData>
  </div>
</template>
