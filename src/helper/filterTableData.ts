export default function filterTableData(arr: any[], dataFilter: any[]) {
    const dataTable: any = [...dataFilter];
        console.log(dataTable)
    return arr.map((element: any) => {
        const itemfilter =  Object.values(element).filter((item: any) => dataTable.includes(item));
        return itemfilter.reverse();
    });
}