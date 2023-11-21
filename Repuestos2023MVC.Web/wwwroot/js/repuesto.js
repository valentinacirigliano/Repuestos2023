$(document).ready(function () {

    var repuestoTable = $('#tblRepuestos').DataTable({
        "ajax": {
            "url": "/Repuestos/GetAll"  
        },
        "columns": [
            { "data": "descripcion" },
            { "data": "precioLista" },
            { "data": "categoria.NombreCategoria" }, 
            {
                "data": "repuestoId",
                "render": function (data) {
                    return `
                        <a class="btn btn-warning" href="/ControllerName/UpSert?id=${data}" >
                            <i class="bi bi-pencil-square"></i>&nbsp;
                            Editar
                        </a>
                        <a class="btn btn-danger" onclick="Eliminar('/ControllerName/Eliminar/${data}')" >
                            <i class="bi bi-trash3"></i> &nbsp;
                            Eliminar
                        </a>
                    `;
                }
            }
        ]
    });

    function Eliminar(url) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    "url": url,
                    "type": 'DELETE',
                    "success": function (data) {
                        console.log(data);
                        if (data.success) {
                            repuestoTable.ajax.reload();
                            toastr.success(data.message);
                        } else {
                            toastr.error(data.message);
                        }
                    }
                });
            }
        });
    }
});
