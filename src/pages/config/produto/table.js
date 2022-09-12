const columns = [
    {
        label: "",
        name: "image_url",
        field: "image_url",
        align: "left",
        sortable: false
    },
    {
        label: "Código",
        name: "code",
        field: "code",
        align: "left",
        sortable: true
    },
    {
        label: "Nome",
        name: "name",
        align: "center",
        field: "name",
        sortable: true
    },
    {
        label: "Tipo do ativo",
        name: "type",
        align: "center",
        field: "type",
        sortable: true
    },
    {
        label: "Ações",
        name: "acoes",
        align: "right",
        field: "id",
        sortable: false
    }
];

export { columns };
