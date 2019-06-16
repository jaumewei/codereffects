/**
 * @return {window.draggableItems}
 */
window.draggableItems = function () {

    var _controller = this;

    var _settings = {
        'selected': '',
        'active':'',
    };

    this.onDrag = function (e) {

        e.dataTransfer.setData("text", e.target.id);

        if (e.target.id !== _settings.selected) {
            
            _settings.selected = e.currentTarget.id;
            
            _settings.active = e.currentTarget.parentNode.id;
            
            console.log('Dragging [' + _settings.selected + '] from [' + _settings.active + ']');
        }
        //return true;
    };

    this.onDrop = function (e) {

        e.preventDefault();

        if (e.currentTarget.id !== _settings.selected && e.currentTarget.id !== _settings.active ) {

            var item_id = e.dataTransfer.getData("text");

            var box_id = e.currentTarget.id;

            e.target.appendChild(document.getElementById(item_id));

            console.log('[' + item_id + '] dropped into [' + box_id + ']');
        }

        //return true;
    };

    this.onRelease = function (e) {
        //make changes in server
        _settings.selected = '';
        _settings.active = '';
    };

    this.onDragOver = function (e) {

        e.preventDefault();

        if (e.currentTarget.id !== _settings.selected) {
            console.log('Dragging [' + e.target.id + '] into [' + _settings.selected + ']?');
        }
    };
    /**
     * @return {window.draggableItems}
     */
    this.setup = function () {

        var boxes = document.getElementsByClassName('container');
        var items = document.getElementsByClassName('draggable');

        for (var i = 0; i < boxes.length; i++) {
            boxes[ i ].ondrop = _controller.onDrop;
            boxes[ i ].ondragover = _controller.onDragOver;
        }
        for (var i = 0; i < items.length; i++) {
            items[ i ].draggable = true;
            items[ i ].ondragstart = _controller.onDrag;
            items[ i ].ondragend = _controller.onRelease;
        }

        return this;
    };

    return this.setup();
};
