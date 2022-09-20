const columns = [
    {
        label: "Produto",
        name: "produto",
        align: "left",
        field: "produto",
        sortable: true
    },
    {
        label: "Pagamento",
        name: "date",
        align: "left",
        field: "date",
        sortable: false
    },
    {
        label: "Tipo de Evento",
        name: "event",
        align: "left",
        field: "event",
        sortable: false
    },
    {
        label: "Quantidade",
        name: "amount",
        align: "left",
        field: "amount",
        sortable: false
    },
    {
        label: "Valor unitário",
        name: "unitary_value",
        align: "left",
        field: "unitary_value",
        sortable: false
    },
    {
        label: "Valor total",
        name: "net_value",
        align: "left",
        field: "net_value",
        sortable: false
    },
    {
        label: "Ações",
        name: "acoes",
        align: "center",
        field: "id",
        sortable: false
    }
];

export { columns };
