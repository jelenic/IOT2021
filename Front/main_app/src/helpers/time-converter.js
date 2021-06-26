export var TimeConverter = function(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = `0${date.getMinutes()}`.substr(-2);
    const seconds = `0${date.getSeconds()}`.substr(-2);
    return (
        `${hour}:${min}:${seconds} ${day}.${month}.${year}.`
    );
};