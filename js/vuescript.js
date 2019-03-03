var globaldata;

var app = new Vue({
    el: '#app',
    created() {
        this.fetchData();	
    },
    data: {
      posts:[]
    },
    methods:{
        fetchData() {
            axios.get('https://api.github.com/users/neelpatel05/events').then(response => {
                for(var i=0;i<5;i++){
                    var name=response.data[i].repo.name.split("/")
                    var createdate=response.data[i].created_at.split("T")
                    var createdate1=createdate[0].split("-")
                    var createdate2=createdate1.reverse().join("-")
                    if (response.data[i].type == "PushEvent"){
                        
                        var data={
                            "created_at":createdate2,
                            "name":name[1],
                            "url":response.data[i].repo.url,
                            "description":response.data[i].payload.description,
                            "type":response.data[i].type,
                            "numberofcommits":response.data[i].payload.commits.length,
                            "commits":response.data[i].payload.commits
                        }
                    }else{
                        var data={
                            "created_at":createdate2,
                            "name":name[1],
                            "url":response.data[i].repo.url,
                            "description":response.data[i].payload.description,
                            "type":response.data[i].type
                        }
                    }
                    this.posts.push(data)
                }
                console.log(this.posts)
            });
        }
    }
  })

