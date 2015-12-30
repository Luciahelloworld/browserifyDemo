var React = require('react');
var ReactDOM = require('react-dom');


//每一选项的组件 
var SelectionItem = React.createClass({
    getInitialState: function() {
        return {
            "number": this.props.number,
            "checked": this.props.checked
        }
    },
    /*纠结了半天的问题。这里的this.props是旧式的props的属性，后面的props是新式的props*/
    componentWillReceiveProps: function(props) {
        this.setState({
            "checked": props.checked
        })
    },

    handleChange: function(event) {
        this.setState({
            "checked": event.target.checked
        })
    },

    render: function() {
        const styles = {
            wrap: {
                "margin": "10px 0 10px 0",
                "color": "#bbb"
            },
            checkBox: {
                "marginLeft": "15%",
                "marginRight": "3%"
            },
            badge: {
                "float": "right",
                "marginRight": "8%"
            }
        }

        return ( < div style = {
                styles.wrap
            } >
            < input type = "checkbox"
            style = {
                styles.checkBox
            }
            name = {
                this.props.content
            }
            checked = {
                this.state.checked
            }
            onChange = {
                this.handleChange
            }
            /> {this.props.content} < span style = {
            styles.badge
        } > {
            this.state.number
        } < /span> </div >
    )
}

});
// 选项的标题
var SelectionTitle = React.createClass({

    getInitialState: function() {
        return {
            "checked": false
        }
    },
    handleChange: function(event) {
        this.setState({
            "checked": event.target.checked
        })
    },

    componentWillReceiveProps: function(props) {
        this.setState({
            "checked": props.checked
        })
    },
    render: function() {
        const styles = {
            wrap: {
                "color": "#fff",
                "margin": "20px 0 0 8%"
            },
            checkBox: {
                "marginRight": "3%"
            },
            badge: {
                "float": "right",
                "marginRight": "6%"
            }
        }
        var item = this.props.item.map(function(items, index) {

            return <SelectionItem key = {
                "SelectionItem" + index
            }
            content = {
                items.item
            }
            number = {
                items.number
            }
            checked = {
                this.state.checked
            }
            />
        }.bind(this));

        return ( < div >
            < div style = {
                styles.wrap
            } >
            < input type = "checkbox"
            style = {
                styles.checkBox
            }
            onChange = {
                this.handleChange
            }
            checked = {
                this.state.checked
            }
            /> {this.props.content} < span className = "badge"
            style = {
                styles.badge
            } > {this.props.count} < /span> < /div > {
                item
            } < /div>
        );
    },

});



// 最外层组件
var LeftPanel = React.createClass({
    getInitialState: function() {
        return {
            "checked": true
        }
    },
    handleClick: function() {
        this.setState({
            "checked": false
        })
    },
    render: function() {
        { /*使用测色器数据渲染后与图片颜色不一致,这里使用的数据是视觉上一致的数据*/ }
        const styles = {
            wrapBackground: {
                "background": "rgb(95,125,140)",
            },
            wrap: {
                "padding": "40px 0 0 0",
            },
            title: {
                "color": "#ddd",
                "fontSize": "20px",
                "marginLeft": "8%"
            },
            button: {
                "float": "right",
                "border": "none",
                "color": "#fff",
                "background": "none",
                "marginRight": "5%"
            }
        }

        { /*存放标题*/ }
        var titles = []; { /*类别归类对象*/ }
        var itemsSort = {};
        var itemsCount = {};
        this.props.content.forEach(function(items) {
            { /*判断对象是否存在*/ }
            if (!itemsSort[items.title]) {
                titles.push(items.title);
                itemsSort[items.title] = [];
                itemsSort[items.title].push(items);


            } else {
                itemsSort[items.title].push(items);
            }

            //设置每一个类型数组的大小
            if(itemsCount[items.title] == undefined){
            	itemsCount[items.title] = items.number;
            }else{
            	itemsCount[items.title] += items.number;
            }
            

        });

        var chooseNode = titles.map(function(title, index) {
            return ( < SelectionTitle key = {
                    "selectionTitle" + index
                }
                content = {
                    title
                }
                item = {
                    itemsSort[title]
                }
                count = {
                    itemsCount[title]
                }
                checked = {
                    this.state.checked
                }
                />
            )
        }.bind(this));

        return ( < div id = "leftPanel"
            ref = "leftPanel"
            style = {
                styles.wrapBackground
            } >
            < div >
            < div style = {
                styles.wrap
            } >
            < span style = {
                styles.title
            } > 招聘职位 < /span> < button style = {
            styles.button
        }
        onClick = {
            this.handleClick
        } > 清空 < /button> < /div > {
            chooseNode
        } < /div> < /div >
    );
},


});



ReactDOM.render( < LeftPanel content = {
            [{
                "id": 1,
                "title": "工程研发部门",
                "item": "Mac 开发工程师",
                "checked": "false",
                "number": 10
            }, {
                "id": 2,
                "title": "工程研发部门",
                "item": "iOS App 测试工程师",
                "checked": "false",
                "number": 17
            }, {
                "id": 3,
                "title": "工程研发部门",
                "item": "Android 远程控制工程师",
                "checked": "false",
                "number": 61
            }, {
                "id": 4,
                "title": "工程研发部门",
                "item": "Web 前端工程师",
                "checked": "false",
                "number": 31
            }, {
                "id": 5,
                "title": "工程研发部门",
                "item": "Android 多媒体软件开发工程师",
                "checked": "false",
                "number": 2
            }, {
                "id": 6,
                "title": "产品设计部门",
                "item": "网页设计师",
                "checked": "false",
                "number": 47
            }, {
                "id": 7,
                "title": "产品设计部门",
                "item": "ID/工业设计师",
                "checked": "false",
                "number": 39
            }, {
                "id": 8,
                "title": "产品设计部门",
                "item": "视觉设计师/GUI界面设计师",
                "checked": "false",
                "number": 42
            }, {
                "id": 9,
                "title": "产品设计部门",
                "item": "平面设计师",
                "checked": "false",
                "number": 8
            }]
        }
        />,document.getElementById("wrap"));
