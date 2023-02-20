$(function () {
    let minutes = 1, seconds = 60, TimerID;
    const check = time => time < 10 ? '0' + time : time;
    $('#Check')[0].disabled = true;
    function Timer() {
        $('#Start')[0].disabled = true;
        $('#Check')[0].disabled = false;
        if (seconds == 0 && minutes == 0) {
            clearInterval(TimerID);
            $('.timer-seconds').text(`00`);
            $('.timer-minute').text(`00`);
            $('.ask-seconds').text(`00`);
            $('.ask-minute').text(`00`);
            if (CheckResoult()) {
                $('.ask').text("Woohoo, well done, you did it!")
            }
            else {
                $('.ask').text("It's a pity, but you lost")
            }

            $('.modal-container').fadeIn(500)
            $('.modal-fon').removeClass('hide')
            $('.modal-check')[0].disabled = true;
        }
        else {
            if (seconds == 60) {
                $('.timer-minute').text(`${check(minutes)}`);
                $('.timer-seconds').text('00');
                $('.ask-minute').text(`${check(minutes)}`);
                $('.ask-seconds').text('00');
                seconds--;
            }
            if (seconds == 59) {
                minutes--;
                $('.timer-minute').text(`${check(minutes)}`);
                $('.timer-seconds').text(`${check(seconds)}`);
                $('.ask-minute').text(`${check(minutes)}`);
                $('.ask-seconds').text(`${check(seconds)}`);
                seconds--;
            }
            else if (seconds < 59 && seconds > 0) {
                seconds--;
                $('.timer-seconds').text(`${check(seconds)}`);
                $('.ask-seconds').text(`${check(seconds)}`);
            }
        }



    }
    function Render() {
        let row = 4, column = 4, piece = '';
        for (let i = 0, top = 0; i < row; i++, top -= 100) {
            for (let j = 0, left = 0; j < column; j++, left -= 100) {
                piece += "<div " +
                    "style='background-position:" + left + "px " + top + "px;'" +
                    " class='puzzle-element'></div>"
            }
        }
        $('.left-field').html(piece);
        let i = 0;
        $('.puzzle-element').each(function (val, key) {
            this.id = `piece${i}`;
            i++;
        })
        let RandomPosition = $('.left-field').children().get();
        function Randomizer() { return Math.random() - 0.5; };
        RandomPosition.sort(Randomizer)
        $('.left-field').html(RandomPosition);
    }
    Render();
    function CheckResoult() {
        if ($('.element').children().length == 16) {
            let CheckPuzzle = $('.element').children();
            for (i = 0; i < CheckPuzzle.length; i++) {
                if (CheckPuzzle[i].id != `piece${i}`) {
                    return false;
                    break;
                }
            }
            return true;
        }
        else {
            return false;

        }
    }
    $('.element').sortable({
        connectWith: '.left-field',
        containment: '.game-field',

    })
    $('.puzzle-element').draggable({
        containment: '.game-field',
        connectToSortable: '.element',
        snap: true,
        cursor: "move",
        start: function () {
            $(this).css({
                zIndex: 1,
            });
            $('#Start').trigger('click');
        }
    });
    $('.element').droppable({
        accept: '.puzzle-element',
    })
    $('.right-field').droppable();
    $('#Start').one('click', function () {
        TimerID = setInterval(Timer, 1000);
    })

    $('#Check').on('click', function () {
        if (seconds == 0 && minutes == 0) {
            $('.modal-check')[0].disabled = true;
        }
        else {
            $('.ask').text("You still have time, you sure?")
            $('.modal-check')[0].disabled = false;
        }
        $('.modal-container').fadeIn(300)
        $('.modal-fon').removeClass('hide')
        $(this)[0].disabled = true;
    })
    $('#New').on('click', function () {
        minutes = 1;
        seconds = 60;
        clearInterval(TimerID);
        $('.timer-seconds').text(`00`);
        $('.timer-minute').text(`01`);
        $('.ask-seconds').text(`00`);
        $('.ask-minute').text(`01`);
        $('#Start')[0].disabled = false;
        location.reload();

    })
    $('.modal-close').on('click', function () {
        if (CheckResoult()) {
            $('#Check')[0].disabled = false;
        }
        else {
            $('#Check')[0].disabled = true;
        }
        $('.modal-container').slideUp(300)
        $('.modal-fon').addClass('hide')
    })
    $('.modal-check').on('click', function () {
        clearInterval(TimerID);
        if (CheckResoult()) {
            $('.ask').text("Woohoo, well done, you did it!")

        }
        else {
            $('.ask').text("It's a pity, but you lost")
        }
        $(this)[0].disabled = true;
    })

})
