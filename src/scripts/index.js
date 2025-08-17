for (let e of document.querySelectorAll(".carousel")) {
  e.onclick = () => {
    let v = e.getAttribute("values").split(",");
    e.innerText = v[Math.floor(Math.random() * v.length)];
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
