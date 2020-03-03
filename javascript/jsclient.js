var body = '';
$( document ).ready(function() {
    $( "#test" ).click(function() {
        getContent("tuto");
    });

});


function getContent(){
    var getQuery = function(){
        return {
            query: "{" +
                "       jcr(workspace: LIVE) {" +
                "           nodeByPath(path: \"/sites/tuto/contents/tutoList\") {" +
                "               descendants(typesFilter: {types: [\"jntuto:tutorialSection\"]}) {"+
                "                   nodes {"+
                "                       title: property(name: \"jcr:title\"){value}" +
                "                       body: property(name: \"body\"){value}" +
                "                       image: property(name: \"image\") {"+
                "                           path: refNode {"+
                "                               path"+
                "                           }" +
                "                       }" +
                "                   }" +
                "               }" +
                "           }" +
                "       }" +
                "   }"
        }
    }
    ajax({
        contentType: "application/json",
        type:'POST',
        url: serverURL+"modules/graphql",
        method: "POST",
        jsonData: getQuery(),
        success: function(o) {
            jsonNodes = JSON.parse(o.response).data.jcr.nodeByPath.descendants.nodes;
            for (var i = 0; i < jsonNodes.length; i++) {
                var rowHash = jsonNodes[i];
                $("#tutoContent").append(buildHtmlSection(rowHash.title.value,rowHash.body.value,rowHash.image.path.path))
            }


            jsonToList(jsonNodes)
            $("#jsonReponse").html(body);
        },
        error:function(error) {
            console.log(error)
        }

    })
}
