for (let e of document.querySelectorAll(".carousel")) {
  e.onclick = () => {
    let v = e.getAttribute("values").split(",");
    let s = v[Math.floor(Math.random() * v.length)];
    while (s == e.innerText) {
      s = v[Math.floor(Math.random() * v.length)];
    }
    e.innerText = s;
  };
}

console.log(`
#                           #        "
#   m   mmm    mmm   mmmmm  #   m  mmm    m   m   mmm
# m"   "   #  "   #  # # #  # m"     #    "m m"  "   #
#"#    m"""#  m"""#  # # #  #"#      #     #m#   m"""#
#  "m  "mm"#  "mm"#  # # #  #  "m  mm#mm   "#    "mm"#
                                           m"
                                          ""`);
