var RATIO = 1.8
var yStep = 10 + 5 * RATIO

function measureText(text) {
  var text = text.split('')
  var width = 0
  var ratio = RATIO
  var zhreg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
  text.forEach(item => {
    if (/[a-zA-Z]/.test(item)) {
      width += 4.5 * ratio
    } else if (/[0-9]/.test(item)) {
      width += 5.5 * ratio
    } else if (/\./.test(item)) {
      width += 2.7 * ratio
    } else if (/-/.test(item)) {
      width += 3.3 * ratio
    } else if (/[\u4e00-\u9fa5]/.test(item)) {
      width += 10.2 * ratio
    } else if (zhreg.test(item)) {
      width += 10.2 * ratio
    } else {
      width += 6 * ratio
    }
  })
  return Math.ceil(width) + 4
}

function drawLine(context, begin, end, width = 2) {
  // context.beginPath()
  // context.setLineCap('round')
  context.strokeStyle = 'lightgreen'
  context.lineWidth= width
  context.moveTo(begin[0], begin[1])
  context.lineTo(end[0], end[1])
  context.stroke()
  // context.closePath()
}

function drawBezierCurve(context, begin, end, width = 2) {
  // context.beginPath()
  context.strokeStyle= 'lightgreen'
  context.lineWidth = width
  context.moveTo(begin[0], begin[1])
  const cp1x = begin[0] + (end[0] - begin[0]) * 0.5
  const cp1y = begin[1] - (begin[1] - end[1]) * 0.2
  const cp2x = begin[0] + (end[0] - begin[0]) * 0.5
  const cp2y = begin[1] - (begin[1] - end[1]) * 0.8
  context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, end[0], end[1])
  context.stroke()
  // context.closePath()
}

function drawText(context, text, begin) {
  // context.beginPath()
  // context.setFontSize(10)
  context.fillStyle = 'darkslategrey'
  context.fillText(text, begin[0], begin[1])
  drawLine(context, [begin[0], begin[1] + 2.5 * RATIO + 2.5], [begin[0] + measureText(text), begin[1] + 2.5 * RATIO + 2.5])
  // context.closePath()
}

function extractNodes(nodes, text) {
  var rootNode = []
  for (let i = 0; i < text.length; i++) {
    text[i] = text[i].split('').splice(2).join('')
    if (text[i].split(' ')[0] != '-') {
      rootNode.push(i)
    }
  }
  for (let i = 0; i < rootNode.length; i++) {
    var newText = []
    if (i < rootNode.length - 1) {
      for (let j = rootNode[i]; j < rootNode[i + 1]; j++) {
        if (j == rootNode[i]) {
          nodes.push({ 'name': text[j] })
          nodes[i]['childrenNum'] = rootNode[i + 1] - rootNode[i] - 1
        } else {
          newText.push(text[j])
        }
      }
    } else {
      for (let j = rootNode[i]; j < text.length; j++) {
        if (j == rootNode[i]) {
          nodes.push({ 'name': text[j] })
          nodes[i]['childrenNum'] = text.length - rootNode[i] - 1
        } else {
          newText.push(text[j])
        }
      }
    }

    if (newText.length > 0) {
      nodes[i]['children'] = []
      extractNodes(nodes[i]['children'], newText)
    }
  }

}

function nodesNum(nodes) {
  var num = 0
  function getNodesNum(nodes) {
    if (nodes['childrenNum'] == 0) {
      num += 1
    } else if (nodes.hasOwnProperty('children')) {
      var children = nodes['children']
      for (let i = 0; i < children.length; i++) {
        getNodesNum(children[i])
      }
    }
  }
  getNodesNum(nodes)
  return num
}

function drawEach(ctx, nodes, x, y) {
  var Num = nodesNum(nodes)
  drawText(ctx, nodes['name'], [x, y + Num * yStep])
  console.log('here')

  var xShift = measureText(nodes['name'])
  if (nodes.hasOwnProperty('children')) {
    var children = nodes['children']
    var begin = [x + xShift, y + Num * yStep + 2.5 * RATIO + 2.5]
    for (let i = 0; i < children.length; i++) {
      drawEach(ctx, children[i], x + xShift + 30, y)
      var Num = nodesNum(children[i])
      var end = [x + xShift + 30, y + Num * yStep + 2.5 * RATIO + 2.5]
      y += Num * yStep * 2
      drawBezierCurve(ctx, begin, end)
    }
  }
}

function nodesDeep(nodes) {
  var path = {}
  var pathDeep = 0

  function getNodesDeep(nodes, nowDeep = '0') {
    var tempnowDeep = nowDeep
    path[nowDeep] = measureText(nodes['name'])

    var temp = 0

    for (let i = 1; i < nowDeep.length + 1; i++) {
      var tempKey = nowDeep.substring(0, i)
      temp += path[tempKey] + 30
    }

    if (temp > pathDeep) {
      pathDeep = temp
    }

    if (nodes.hasOwnProperty('children')) {
      for (let i = 0; i < nodes['children'].length; i++) {
        var nextDeep = tempnowDeep + i.toString()
        getNodesDeep(nodes['children'][i], nowDeep = nextDeep)
      }
    }
  }


  getNodesDeep(nodes)

  return pathDeep

}


var app = new Vue({
	el: '#app',
	data: {
		listsText: '',
		listsRowNum: 1,
		contentLastLine: null,
		canvasWidth: 0,
		canvasHeight: 0
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
		          if (this.contentLastLine != '') {
		            content = content + previousLine.match(/- /g).join('')
		            needSetData = true
		          }
		        } else {
		          if (this.contentLastLine != '') {
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
		    this.listsRowNum = contentList.length || 3

		    if(needSetData){
		      this.listsText = content
		    }
		    if(cursor) {
		    	setTimeout(function () {
			    	e.target.setSelectionRange(cursor, cursor)
		    	}, 50)
		    }

		},
		handleFocus: function (e) {
			if (!e.target.value) {
				this.listsText = '- '
			}

		},
		drawNodes: function () {
		    var textList = document.getElementById('nodes').value.split('\n').concat()

		    for (let i = 0; i < textList.length; i++) {
		      if (!/[0-9a-zA-Z\u4e00-\u9fa5]/.test(textList[i])) {
		        textList[i] = ''
		      }
		    }

		    var text = textList.join('\n').replace(/\n[\n]+/g, "\n")

		    var nodes = []
		    var textList = text.split('\n')
		    if (textList[0].indexOf('- - ') == 0) {
		      textList[0] = textList[0].substring(2, textList[0].length)
		    }
		    extractNodes(nodes, textList)

		    RATIO = 1.8
		    var width = nodesDeep(nodes[0])
		    var nodeX = 15
		    if (width < 400) {
		      nodeX = (400 - width) / 2
		      width = 400
		    }
		    var ratio = RATIO
		    yStep = 10 + 5 * ratio
		    var height = nodesNum(nodes[0]) * (20 + 10 * ratio) + 40 + 20 * ratio

		    this.canvasWidth = width
		    this.canvasHeight = height

		    setTimeout(() => {
			    var c = document.getElementById('nodesCanvas')
			    var ctx = c.getContext('2d')
			    ctx.fillStyle = '#ffffff'
			    ctx.fillRect(0, 0, width, height)
			    ctx.lineCap = 'round' 
			    ctx.font = 10 * ratio + 'px'
			    drawEach(ctx, nodes[0], nodeX, 20 + 10 * ratio)
		    }, 500)

		  },
	}
})