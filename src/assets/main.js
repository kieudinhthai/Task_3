var generation = 0

const getTree = async () => {

    try {
        const data = await axios({
            method: 'GET',
            url: '/api/'
        })
        const result = data.data
        console.log(result)
        if (result) {
            let row = []
            let max = result[0].generation
            for (let i = 0; i < result.length; i++) {
                // if(result[i].generation ==0){
                // $('#generation_0').append(` <a href="#">${result[i].name}</a>`)
                // }
                // tìm max
                if (max < result[i].generation) {
                    max = result[i].generation
                }

                console.log(max)
                // $("#tree").append( `<ul id="generation_0"></ul>`)

                for (let j = 0; j <= max; j++) {
                    if (result[i].generation == j) {
                        let married = (Object.values(result[i].wife).length != 0) ? result[i].wife : (Object.values(result[i].husband).length != 0) ? result[i].husband : "none"
                        $(`#generation_${j}`).append(`<li > <a onclick="getDetail('${result[i]._id}')" href="#">${result[i].name}- ${result[i].birthday}</a><a <a onclick="getDetailMarried('${married._id}')" class="${married}" href="#">${married.name + "-" + married.birthday}</a><ul id="generation_${j + 1}"></ul></li>`)
                    }
                }
            }
            $(".none").css("display", "none");


        }
    } catch (error) {
        console.log(error)
    }


}

getTree()

const getModal = ()=>{
   var modal = `<div class="modal fade" id="modelId" tabindex="-1" role="dialog" >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <div class="form-group">
        <label for="">Name</label>
        <input type="text" name="" id="modal-name" class="form-control"   aria-describedby="helpId">
      </div>
      <div class="form-group">
        <label for="">Birthday</label>
        <input type="text" name="" id="modal-birthday" class="form-control"   aria-describedby="helpId">
      </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" id="button-update" onclick="update()" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
  `
  $(document.body).append(modal)
  $('#modelId').modal('show')
}

const getDetail = async (id) => {
    const data = await  axios({
        method: "GET",
        url: "/api/" + id
    })
  //  console.log(data.data)
    getModal()
    $('#modal-name').val(data.data.name)
    $('#modal-birthday').val(data.data.birthday)
    $('#button-update').val(data.data._id)
    console.log(data.data)
  
   
}

const getDetailMarried = async (id) => {
    const data = await axios({
        method: "GET",
        url: "/api/" + id
    })
    let married = (Object.values(data.data.wife).length != 0) ? data.data.wife : (Object.values(data.data.husband).length != 0) ? data.data.husband : ""
    getModal()
    $('#modal-name').val(married.name)
    $('#modal-birthday').val(married.birthday)
    $('#button-update').val(married._id)
    console.log(data.data)
}

const update = async () => {
    let data = {
        name : $('#modal-name').val(),
        birthday : $('#modal-birthday').val(),
    }
    const result = await  axios({
        method: "POST",
        url: "/api/" + $('#button-update').val(),
        data: data,
        headers: {"Content-type": "application/json ; charset=utf-8"}
        
    })
     console.log(result)
     alert("update successful")
     $('#modelId').modal('hide')
     $('#generation_0').empty()
     getTree()
   
}


const searchTree = async () => {
    $('#content').empty()
    let query = $('#query-input').val()
    try {
        const data = await axios({
            method: 'GET',
            url: '/api/search?q='+ query
        })
        const result = data.data
        console.log(result)
        if (result) {
            let row = []
            let max = result[0].generation
            for (let i = 0; i < result.length; i++) {
                // if(result[i].generation ==0){
                // $('#generation_0').append(` <a href="#">${result[i].name}</a>`)
                // }
                // tìm max
                if (max < result[i].generation) {
                    max = result[i].generation
                }
                $('#content').append(`  <ul id="gener_${result[0].generation}"> </ul>`)
                // $("#tree").append( `<ul id="generation_0"></ul>`)
                
                for (let j = 0; j <= max; j++) {
                    if (result[i].generation == j) {
                        let married = (Object.values(result[i].wife).length != 0) ? result[i].wife : (Object.values(result[i].husband).length != 0) ? result[i].husband : "none"
                        $(`#gener_${j}`).append(`<li > <a onclick="getDetail('${result[i]._id}')" href="#">${result[i].name}- ${result[i].birthday}</a><a <a onclick="getDetailMarried('${married._id}')" class="${married}" href="#">${married.name + "-" + married.birthday}</a><ul id="gener_${j + 1}"></ul></li>`)
                    }
                }
            }
            $(".none").css("display", "none");


        }
    } catch (error) {
        console.log(error)
    }


}


 const uploadFile =() =>{
     $('#form-upload').submit()
 }