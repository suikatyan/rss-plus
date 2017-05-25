class UI {
  constructor() {
    UI.NEW_DURATION = 20 * 60;
    this.$main = $("#main");
  }

  onUpdate() {
    const date = new Date();
    $("#update_time").text(this.getDateString(date));
  }

  append(title, url, date, site) {
    let html = "";
    html += `<a href="${url}" target="_blank">`;
    html += `<div data-key="${url}" class="item">`;
    html += `<span class="site">${site}</span>`;
    html += `<span class="date">${this.getDateString(date)}</span>`;
    html += `<br><span class="title">${title}</span>`;
    html += `</div></a>`;
    const $item = $(html).appendTo(this.$main);
    $item.hide().fadeIn(1000);

    $("body").scrollTop($(document).height());
    $item.children().addClass("new");

    $item.on("click, mouseover", () => {
      $item.children().removeClass("new");
    });
    setTimeout(() => {
      $item.children().removeClass("new");
    }, UI.NEW_DURATION * 1000);
  }

  remove(key) {
    this.$main.find("[data-key='${key}']").remove();
  }

  zero(number, length = 2) {
    number = number.toString();
    if (number.length >= length) {
      return number;
    }
    return ("0".repeat(length) + number).slice(length * -1);
  }

  getDateString(date) {
    const ymd =  `${this.zero(date.getFullYear())}/${this.zero(date.getMonth())}/${this.zero(date.getDate())}`;
    const hms = `${this.zero(date.getHours())}:${this.zero(date.getMinutes())}:${this.zero(date.getSeconds())}`;

    return `${ymd} ${hms}`;
  }
}
