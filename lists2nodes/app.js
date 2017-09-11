var app = new Vue({
	el: '#app',
	data: {
		listsText: '',
		listsRowNum: null,
		contentLastLine: ''
	},
	methods: {
		handlePrefix: function (e) {
			if (!e.target.value) {
				this.listsText = '- '
				return
			}
			var content = e.target.value
		    var cursor = null
		    var needSetData = false
		    if (!content.match('\n')) {
		      if (!content.match('- ')) {
		        content = '- ' + content.substring(1, content.length)
		        needSetData = true
		      } else if (content.match(/- /g).length > 1) {
		        content = content.substring(content.lastIndexOf('- '), content.length)
		        needSetData = true
		      }
		    } else {
		      if (content.lastIndexOf('\n') == content.length - 1) {
		        var contentList = content.split('\n')
		        if (contentList.length != 2) {
		          var previousLine = contentList[contentList.length - 2]
		          if (this.contentLastLine != '-') {
		            content = content + previousLine.match(/- /g).join('')
		            needSetData = true
		          }
		        } else {
		          if (this.contentLastLine != '-') {
		            content = content + '- - '
		            needSetData = true
		          }
		        }
		      } else if (content.match('\n\n')) {
		        var previousPart = content.split('\n\n')[0].split('\n')
		        var postPart = content.split('\n\n')[1]
		        var previousLine = previousPart[previousPart.length - 1]
		        content = previousPart.join('\n') + '\n' + previousLine.match(/- /g).join('') + '\n' + postPart
		        cursor = (previousPart.join('\n') + '\n' + previousLine.match(/- /g).join('')).length
		        needSetData = true
		      } 
		    }
		    var contentList = content.split('\n')
		    this.contentLastLine = contentList[contentList.length - 1]

		    if(needSetData){
		      this.listsText = content
		    }

		},
		handleFocus: function (e) {
			if (!e.target.value) {
				this.listsText = '- '
			}
		}
	}
})