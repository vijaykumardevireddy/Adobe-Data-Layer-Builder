document.activeElement.addEventListener("click", function () {
  var buttonName = document.activeElement.textContent;
  var Find =
    document.activeElement.parentElement.parentElement.getAttribute("class");
  var classname1 =
    document.activeElement.parentElement.parentElement.parentElement.getAttribute(
      "class"
    );
  if (Find == "container1") {
    document.querySelector(".container1").style.display = "none";
    document.querySelector(".properydropdown").style.display = "none";

    if (buttonName == "Website Tags") {
      document.querySelector(".backbutton").style.display = "contents";
      document.querySelector(".container2").style.display = "contents";
    } else if (buttonName == "Mobile App Tags") {
      document.querySelector(".backbutton").style.display = "contents";
      document.querySelector(".container3").style.display = "contents";
    }
  } else if (Find == "container2") {
    document.querySelector(".container2").style.display = "none";
    if (buttonName == "Single Page Application") {
      document.querySelector(".container4").style.display = "contents";
      document.querySelector(".satellite").style.display = "contents";
      var adrop = document.querySelector(".dropdown").value;
      document
        .querySelector("#websiteSPAcontainer > div:nth-child(1) > h4 > span")
        .append(adrop);
    } else if (buttonName == "Non - Single Page Application") {
      document.querySelector(".container5").style.display = "contents";
      var adrop1 = document.querySelector(".dropdown").value;
      document
        .querySelector(
          "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > span"
        )
        .append(adrop1);
    }
  } else if (Find == "container4") {
    var u = [];
    var o = [];
    var final = [];
    var localkey = [];
    if (buttonName == "+") {
      var newKey = document.createElement("input");
      newKey.type = "text";
      newKey.placeholder = "Key";
      var newText = document.createTextNode("  :  ");
      var newValue = document.createElement("input");
      newValue.type = "text";
      newValue.placeholder = "Value";
      document.getElementById("Form").appendChild(newKey);
      document.getElementById("Form").appendChild(newText);
      document.getElementById("Form").appendChild(newValue);
    } else if (buttonName == "-") {
      var a = document.getElementById("Form");
      var b = a.lastChild.innerHTML;
      if (b == "") {
        for (var i = 0; i < 3; i++) {
          a.removeChild(a.lastChild);
        }
      } else if (b == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container4" && buttonName == "Show DataLayer") {
      document.querySelector(".showbox").style.display = "contents";
      var l = document.getElementsByTagName("input").length;
      for (var i = 0; i < l; i++) {
        var value =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value == true) {
          var realvalue = document.getElementsByTagName("input")[i].value;
          if (u.indexOf(realvalue) == -1 && realvalue != "") {
            u.push(realvalue);
          }
        } else if (key == true) {
          var realkey = document.getElementsByTagName("input")[i].value;
          if (o.indexOf(realkey) == -1 && realkey != "") {
            o.push(realkey);
          }
        }
      }
      for (var j = 0; j < u.length; j++) {
        final.push("'" + o[j] + "'" + ":" + "'" + u[j] + "'");
      }
      var idtrack = document.querySelector(
        "#websiteSPAcontainer > div.satellite > h3 > input[type=text]"
      ).value;
      var objectName = document.querySelector(
        "#websiteSPAcontainer > div.object > h4 > span > input[type=text]"
      ).value;
      var resultobject = "";
      if (objectName != "") {
        resultobject = objectName;
      } else if (objectName == "") {
        resultobject = "digiData";
      }
      document.querySelector("#showbox").value =
        "var " +
        resultobject +
        ";\n" +
        resultobject +
        "={\n" +
        final.join(",\n") +
        "\n};" +
        "\n_satellite.track(" +
        "'" +
        idtrack +
        "'" +
        ")";
    } else if (Find == "container4" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#websiteSPAcontainer > div:nth-child(1) > h4 > span"
      ).textContent;
      var spaproperty = document.querySelector(
        "#websiteSPAcontainer > div:nth-child(1) > h4 > select.dropdown1"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (spaproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && spaproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (spaproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey.push(realkey);
              var lenopti = document.querySelector(
                "#websiteSPAcontainer > div:nth-child(1) > h4 > select.dropdown1"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#websiteSPAcontainer > div:nth-child(1) > h4 > select.dropdown1"
                )[j].value;
                var match = localkey.indexOf(optival) > -1;
                if (match == false) {
                  localkey.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container4" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#websiteSPAcontainer > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#websiteSPAcontainer > div:nth-child(1) > h4 > select.dropdown1"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#websiteSPAcontainer > div:nth-child(1) > h4 > select"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#websiteSPAcontainer > div:nth-child(1) > h4 > select.dropdown1"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#websiteSPAcontainer > div:nth-child(1) > h4 > select"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (buttonName == "Insert") {
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document.querySelector("#showbox").value;
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form").getElementsByTagName("input")[i].value =
          "";
      }
    }
  } else if (Find == "container5") {
    var u1 = [];
    var o1 = [];
    var final1 = [];
    var localkey1 = [];
    if (buttonName == "+") {
      var newKey1 = document.createElement("input");
      newKey1.type = "text";
      newKey1.placeholder = "Key";
      var newText1 = document.createTextNode("  :  ");
      var newValue1 = document.createElement("input");
      newValue1.type = "text";
      newValue1.placeholder = "Value";
      document.getElementById("Form1").appendChild(newKey1);
      document.getElementById("Form1").appendChild(newText1);
      document.getElementById("Form1").appendChild(newValue1);
    } else if (buttonName == "-") {
      var a1 = document.getElementById("Form1");
      var b1 = a1.lastChild.innerHTML;
      if (b1 == "") {
        for (var r = 0; r < 3; r++) {
          a1.removeChild(a1.lastChild);
        }
      } else if (b1 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container5" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > span"
      ).textContent;
      var nonspaproperty = document.querySelector(
        "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (nonspaproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && nonspaproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (nonspaproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey1.push(realkey);
              var lenopti = document.querySelector(
                "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
                )[j].value;
                var match = localkey1.indexOf(optival) > -1;
                if (match == false) {
                  localkey1.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey1.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container5" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (Find == "container5" && buttonName == "Show DataLayer") {
      document.querySelector(".showbox1").style.display = "contents";
      var l1 = document.getElementsByTagName("input").length;
      for (var r = 0; r < l1; r++) {
        var value1 =
          document
            .getElementsByTagName("input")
            [r].getAttribute("placeholder") == "Value";
        var key1 =
          document
            .getElementsByTagName("input")
            [r].getAttribute("placeholder") == "Key";
        if (value1 == true) {
          var realvalue1 = document.getElementsByTagName("input")[r].value;
          if (u1.indexOf(realvalue1) == -1 && realvalue1 != "") {
            u1.push(realvalue1);
          }
        } else if (key1 == true) {
          var realkey1 = document.getElementsByTagName("input")[r].value;
          if (o1.indexOf(realkey1) == -1 && realkey1 != "") {
            o1.push(realkey1);
          }
        }
      }
      for (var t = 0; t < u1.length; t++) {
        final1.push("'" + o1[t] + "'" + ":" + "'" + u1[t] + "'");
      }
      var objectName1 = document.querySelector(
        "#websiteNon-SPAcontainer > div.object > h4 > span > input[type=text]"
      ).value;
      var resultobject1 = "";
      if (objectName1 != "") {
        resultobject1 = objectName1;
      } else if (objectName1 == "") {
        resultobject1 = "digiData";
      }
      document.querySelector("#showbox1").value =
        "var " +
        resultobject1 +
        ";\n" +
        resultobject1 +
        "={\n" +
        final1.join(",\n") +
        "\n};";
    } else if (buttonName == "Insert") {
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document.querySelector("#showbox1").value;
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox1").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form1")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form1").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (buttonName == "Back") {
    var cont1 =
      document.querySelector(".container1").style.display == "contents";
    var cont2 =
      document.querySelector(".container2").style.display == "contents";
    var cont3 =
      document.querySelector(".container3").style.display == "contents";
    var cont4 =
      document.querySelector(".container4").style.display == "contents";
    var cont5 =
      document.querySelector(".container5").style.display == "contents";
    var cont6 =
      document.querySelector(".container6").style.display == "contents";
    var cont7 =
      document.querySelector(".container7").style.display == "contents";
    var cont8 =
      document.querySelector(".container8").style.display == "contents";
    var cont9 =
      document.querySelector(".container9").style.display == "contents";
    var cont10 =
      document.querySelector(".container10").style.display == "contents";
    var cont11 =
      document.querySelector(".container11").style.display == "contents";
    var cont12 =
      document.querySelector(".container12").style.display == "contents";
    var cont13 =
      document.querySelector(".properydropdown").style.display == "contents";
    if (cont2 == true) {
      document.querySelector(".backbutton").style.display = "none";
      document.querySelector(".container1").style.display = "contents";
      document.querySelector(".properydropdown").style.display = "contents";
      document.querySelector(".container2").style.display = "none";
    } else if (cont4 == true) {
      document.querySelector(".container2").style.display = "contents";
      document.querySelector(".container4").style.display = "none";
      document.querySelector(
        "#websiteSPAcontainer > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#websiteSPAcontainer > div:nth-child(1) > h4 > select.dropdown1"
      ).innerHTML = "";
    } else if (cont5 == true) {
      document.querySelector(".container2").style.display = "contents";
      document.querySelector(".container5").style.display = "none";
      document.querySelector(
        "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#websiteNon-SPAcontainer > div:nth-child(1) > h4 > select.dropdown21"
      ).innerHTML = "";
    } else if (cont3 == true) {
      document.querySelector(".backbutton").style.display = "none";
      document.querySelector(".container1").style.display = "contents";
      document.querySelector(".container3").style.display = "none";
      document.querySelector(".properydropdown").style.display = "contents";
    } else if (cont6 == true) {
      document.querySelector(".container3").style.display = "contents";
      document.querySelector(".container6").style.display = "none";
      document.querySelector(
        "#container6 > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#container6 > div:nth-child(1) > h4 > select.dropdown31"
      ).innerHTML = "";
    } else if (cont7 == true) {
      document.querySelector(".container3").style.display = "contents";
      document.querySelector(".container7").style.display = "none";
      document.querySelector(
        "#container7 > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#container7 > div:nth-child(1) > h4 > select.dropdown41"
      ).innerHTML = "";
    } else if (cont8 == true) {
      document.querySelector(".container3").style.display = "contents";
      document.querySelector(".container8").style.display = "none";
      document.querySelector(
        "#container8 > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#container8 > div:nth-child(1) > h4 > select.dropdown51"
      ).innerHTML = "";
    } else if (cont9 == true) {
      document.querySelector(".container3").style.display = "contents";
      document.querySelector(".container9").style.display = "none";
      document.querySelector(
        "#container9 > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#container9 > div:nth-child(1) > h4 > select.dropdown61"
      ).innerHTML = "";
    } else if (cont10 == true) {
      document.querySelector(".container3").style.display = "contents";
      document.querySelector(".container10").style.display = "none";
      document.querySelector(
        "#container10 > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#container10 > div:nth-child(1) > h4 > select.dropdown71"
      ).innerHTML = "";
    } else if (cont11 == true) {
      document.querySelector(".container3").style.display = "contents";
      document.querySelector(".container11").style.display = "none";
      document.querySelector(
        "#container11 > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#container11 > div:nth-child(1) > h4 > select.dropdown81"
      ).innerHTML = "";
    } else if (cont12 == true) {
      document.querySelector(".container3").style.display = "contents";
      document.querySelector(".container12").style.display = "none";
      document.querySelector(
        "#container12 > div:nth-child(1) > h4 > span"
      ).innerHTML = "";
      document.querySelector(
        "#container12 > div:nth-child(1) > h4 > select.dropdown91"
      ).innerHTML = "";
    }
  } else if (Find == "container3") {
    document.querySelector(".container3").style.display = "none";
    if (buttonName == "Android Native") {
      document.querySelector(".container6").style.display = "contents";
      var adrop2 = document.querySelector(".dropdown").value;
      document
        .querySelector("#container6 > div:nth-child(1) > h4 > span")
        .append(adrop2);
    } else if (buttonName == "iOS Native") {
      document.querySelector(".container7").style.display = "contents";
      var adrop3 = document.querySelector(".dropdown").value;
      document
        .querySelector("#container7 > div:nth-child(1) > h4 > span")
        .append(adrop3);
    } else if (buttonName == "React Native") {
      document.querySelector(".container8").style.display = "contents";
      var adrop4 = document.querySelector(".dropdown").value;
      document
        .querySelector("#container8 > div:nth-child(1) > h4 > span")
        .append(adrop4);
    } else if (buttonName == "Cordova") {
      document.querySelector(".container9").style.display = "contents";
      var adrop5 = document.querySelector(".dropdown").value;
      document
        .querySelector("#container9 > div:nth-child(1) > h4 > span")
        .append(adrop5);
    } else if (buttonName == "Unity") {
      document.querySelector(".container10").style.display = "contents";
      var adrop6 = document.querySelector(".dropdown").value;
      document
        .querySelector("#container10 > div:nth-child(1) > h4 > span")
        .append(adrop6);
    } else if (buttonName == "Xamarin") {
      document.querySelector(".container11").style.display = "contents";
      var adrop7 = document.querySelector(".dropdown").value;
      document
        .querySelector("#container11 > div:nth-child(1) > h4 > span")
        .append(adrop7);
    } else if (buttonName == "Flutter") {
      document.querySelector(".container12").style.display = "contents";
      var adrop8 = document.querySelector(".dropdown").value;
      document
        .querySelector("#container12 > div:nth-child(1) > h4 > span")
        .append(adrop8);
    }
  } else if (Find == "container6") {
    var u2 = [];
    var o2 = [];
    var final2 = [];
    var localkey2 = [];
    if (buttonName == "+") {
      var newKey2 = document.createElement("input");
      newKey2.type = "text";
      newKey2.placeholder = "Key";
      var newText2 = document.createTextNode("  ,  ");
      var newValue2 = document.createElement("input");
      newValue2.type = "text";
      newValue2.placeholder = "Value";
      document.getElementById("Form2").appendChild(newKey2);
      document.getElementById("Form2").appendChild(newText2);
      document.getElementById("Form2").appendChild(newValue2);
    } else if (buttonName == "-") {
      var a2 = document.getElementById("Form2");
      var b2 = a2.lastChild.innerHTML;
      if (b2 == "") {
        for (var i = 0; i < 3; i++) {
          a2.removeChild(a2.lastChild);
        }
      } else if (b2 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container6" && buttonName == "Show Track State") {
      document.querySelector(".showbox2").style.display = "contents";
      var l2 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l2; i++) {
        var value2 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key2 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value2 == true) {
          var realvalue2 = document.getElementsByTagName("input")[i].value;
          if (u2.indexOf(realvalue2) == -1 && realvalue2 != "") {
            u2.push(realvalue2);
          }
        } else if (key2 == true) {
          var realkey2 = document.getElementsByTagName("input")[i].value;
          if (o2.indexOf(realkey2) == -1 && realkey2 != "") {
            o2.push(realkey2);
          }
        }
      }
      for (var j = 0; j < u2.length; j++) {
        final2.push(
          "ContextData.put(" +
            "'" +
            o2[j] +
            "'" +
            "," +
            "'" +
            u2[j] +
            "'" +
            "),"
        );
      }
      var state = document.querySelector(
        "#container6 > div.satellite1 > h3 > input[type=text]"
      ).value;
      document.querySelector("#showbox2").value =
        final2.join("\r\n") +
        "\nMobileCore.trackState('" +
        state +
        "'" +
        "," +
        "ContextData);";
    } else if (Find == "container6" && buttonName == "Show Track Action") {
      document.querySelector(".showbox2").style.display = "contents";
      var l2 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l2; i++) {
        var value2 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key2 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value2 == true) {
          var realvalue2 = document.getElementsByTagName("input")[i].value;
          if (u2.indexOf(realvalue2) == -1 && realvalue2 != "") {
            u2.push(realvalue2);
          }
        } else if (key2 == true) {
          var realkey2 = document.getElementsByTagName("input")[i].value;
          if (o2.indexOf(realkey2) == -1 && realkey2 != "") {
            o2.push(realkey2);
          }
        }
      }
      for (var j = 0; j < u2.length; j++) {
        final2.push(
          "ContextData.put(" +
            "'" +
            o2[j] +
            "'" +
            "," +
            "'" +
            u2[j] +
            "'" +
            "),"
        );
      }
      var state = document.querySelector(
        "#container6 > div.satellite1 > h3 > input[type=text]"
      ).value;
      document.querySelector("#showbox2").value =
        final2.join("\r\n") +
        "\nMobileCore.trackAction('" +
        state +
        "'" +
        "," +
        "ContextData);";
    } else if (Find == "container6" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#container6 > div:nth-child(1) > h4 > span"
      ).textContent;
      var androidproperty = document.querySelector(
        "#container6 > div:nth-child(1) > h4 > select.dropdown31"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (androidproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && androidproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (androidproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey2.push(realkey);
              var lenopti = document.querySelector(
                "#container6 > div:nth-child(1) > h4 > select.dropdown31"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#container6 > div:nth-child(1) > h4 > select.dropdown31"
                )[j].value;
                var match = localkey2.indexOf(optival) > -1;
                if (match == false) {
                  localkey2.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey2.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container6" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#container6 > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#container6 > div:nth-child(1) > h4 > select.dropdown31"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container6 > div:nth-child(1) > h4 > select.dropdown31"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#container6 > div:nth-child(1) > h4 > select.dropdown31"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container6 > div:nth-child(1) > h4 > select.dropdown31"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (buttonName == "Insert") {
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document.querySelector("#showbox2").value;
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox2").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form2")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form2").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (Find == "container7") {
    var u3 = [];
    var o3 = [];
    var final3 = [];
    var final33 = [];
    var localkey2 = [];
    if (buttonName == "+") {
      var newKey3 = document.createElement("input");
      newKey3.type = "text";
      newKey3.placeholder = "Key";
      var newText3 = document.createTextNode("  :  ");
      var newValue3 = document.createElement("input");
      newValue3.type = "text";
      newValue3.placeholder = "Value";
      document.getElementById("Form3").appendChild(newKey3);
      document.getElementById("Form3").appendChild(newText3);
      document.getElementById("Form3").appendChild(newValue3);
    } else if (buttonName == "-") {
      var a3 = document.getElementById("Form3");
      var b3 = a3.lastChild.innerHTML;
      if (b3 == "") {
        for (var i = 0; i < 3; i++) {
          a3.removeChild(a3.lastChild);
        }
      } else if (b3 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container7" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#container7 > div:nth-child(1) > h4 > span"
      ).textContent;
      var iosproperty = document.querySelector(
        "#container7 > div:nth-child(1) > h4 > select.dropdown41"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (iosproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && iosproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (iosproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey2.push(realkey);
              var lenopti = document.querySelector(
                "#container7 > div:nth-child(1) > h4 > select.dropdown41"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#container7 > div:nth-child(1) > h4 > select.dropdown41"
                )[j].value;
                var match = localkey2.indexOf(optival) > -1;
                if (match == false) {
                  localkey2.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey2.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container7" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#container7 > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#container7 > div:nth-child(1) > h4 > select.dropdown41"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container7 > div:nth-child(1) > h4 > select.dropdown41"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#container7 > div:nth-child(1) > h4 > select.dropdown41"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container7 > div:nth-child(1) > h4 > select.dropdown41"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (Find == "container7" && buttonName == "Show Track State") {
      document.querySelector(".showbox3").style.display = "contents";
      var l3 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l3; i++) {
        var value3 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key3 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value3 == true) {
          var realvalue3 = document.getElementsByTagName("input")[i].value;
          if (u3.indexOf(realvalue3) == -1 && realvalue3 != "") {
            u3.push(realvalue3);
          }
        } else if (key3 == true) {
          var realkey3 = document.getElementsByTagName("input")[i].value;
          if (o3.indexOf(realkey3) == -1 && realkey3 != "") {
            o3.push(realkey3);
          }
        }
      }
      for (var j = 0; j < u3.length; j++) {
        var state1 = document.querySelector(
          "#container7 > div.satellite2 > h3 > input[type=text]"
        ).value;
        final3.push(
          "ACPCore.trackState(" +
            "'" +
            state1 +
            "'," +
            " data: [" +
            "'" +
            o3[j] +
            "'" +
            ":" +
            "'" +
            u3[j] +
            "'" +
            "])"
        );
        final33.push(
          "[ACPCore trackState:@" +
            "'" +
            state1 +
            "'" +
            " data:@{@" +
            "'" +
            o3[j] +
            "'" +
            ":@" +
            "'" +
            u3[j] +
            "'" +
            "}];"
        );
      }
      document.querySelector("#showbox3").value =
        "iOS - Swift\n\n" +
        final3.join("\r\n") +
        "\n" +
        "\niOS - Objective-C\n" +
        "\n" +
        final33.join("\r\n");
    } else if (Find == "container7" && buttonName == "Show Track Action") {
      document.querySelector(".showbox3").style.display = "contents";
      var l3 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l3; i++) {
        var value3 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key3 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value3 == true) {
          var realvalue3 = document.getElementsByTagName("input")[i].value;
          if (u3.indexOf(realvalue3) == -1 && realvalue3 != "") {
            u3.push(realvalue3);
          }
        } else if (key3 == true) {
          var realkey3 = document.getElementsByTagName("input")[i].value;
          if (o3.indexOf(realkey3) == -1 && realkey3 != "") {
            o3.push(realkey3);
          }
        }
      }
      for (var j = 0; j < u3.length; j++) {
        var state1 = document.querySelector(
          "#container7 > div.satellite2 > h3 > input[type=text]"
        ).value;
        final3.push(
          "ACPCore.trackAction(" +
            "'" +
            state1 +
            "'," +
            " data: [" +
            "'" +
            o3[j] +
            "'" +
            ":" +
            "'" +
            u3[j] +
            "'" +
            "])"
        );
        final33.push(
          "[ACPCore trackAction:@" +
            "'" +
            state1 +
            "'" +
            " data:@{@" +
            "'" +
            o3[j] +
            "'" +
            ":@" +
            "'" +
            u3[j] +
            "'" +
            "}];"
        );
      }
      document.querySelector("#showbox3").value =
        "iOS - Swift\n\n" +
        final3.join("\r\n") +
        "\n" +
        "\niOS - Objective-C\n" +
        "\n" +
        final33.join("\r\n");
    } else if (buttonName == "Insert - Swift") {
      var SwiftData = document
        .querySelector("#showbox3")
        .value.search("iOS - Objective-C");
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document
          .querySelector("#showbox3")
          .value.slice(0, SwiftData);
        return context.sync();
      });
    } else if (buttonName == "Insert - Objective-C") {
      var SwiftData = document
        .querySelector("#showbox3")
        .value.search("iOS - Objective-C");
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document
          .querySelector("#showbox3")
          .value.slice(SwiftData);
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox3").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form3")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form3").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (Find == "container8") {
    var u4 = [];
    var o4 = [];
    var final4 = [];
    var localkey2 = [];
    if (buttonName == "+") {
      var newKey4 = document.createElement("input");
      newKey4.type = "text";
      newKey4.placeholder = "Key";
      var newText4 = document.createTextNode("  :  ");
      var newValue4 = document.createElement("input");
      newValue4.type = "text";
      newValue4.placeholder = "Value";
      document.getElementById("Form4").appendChild(newKey4);
      document.getElementById("Form4").appendChild(newText4);
      document.getElementById("Form4").appendChild(newValue4);
    } else if (buttonName == "-") {
      var a4 = document.getElementById("Form4");
      var b4 = a4.lastChild.innerHTML;
      if (b4 == "") {
        for (var i = 0; i < 3; i++) {
          a4.removeChild(a4.lastChild);
        }
      } else if (b4 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container8" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#container8 > div:nth-child(1) > h4 > span"
      ).textContent;
      var reactproperty = document.querySelector(
        "#container8 > div:nth-child(1) > h4 > select.dropdown51"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (reactproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && reactproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (reactproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey2.push(realkey);
              var lenopti = document.querySelector(
                "#container8 > div:nth-child(1) > h4 > select.dropdown51"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#container8 > div:nth-child(1) > h4 > select.dropdown51"
                )[j].value;
                var match = localkey2.indexOf(optival) > -1;
                if (match == false) {
                  localkey2.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey2.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container8" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#container8 > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#container8 > div:nth-child(1) > h4 > select.dropdown51"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container8 > div:nth-child(1) > h4 > select.dropdown51"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#container8 > div:nth-child(1) > h4 > select.dropdown51"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container8 > div:nth-child(1) > h4 > select.dropdown51"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (Find == "container8" && buttonName == "Show Track State") {
      document.querySelector(".showbox5").style.display = "contents";
      var l4 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l4; i++) {
        var value4 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key4 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value4 == true) {
          var realvalue4 = document.getElementsByTagName("input")[i].value;
          if (u4.indexOf(realvalue4) == -1 && realvalue4 != "") {
            u4.push(realvalue4);
          }
        } else if (key4 == true) {
          var realkey4 = document.getElementsByTagName("input")[i].value;
          if (o4.indexOf(realkey4) == -1 && realkey4 != "") {
            o4.push(realkey4);
          }
        }
      }
      for (var j = 0; j < u4.length; j++) {
        var state2 = document.querySelector(
          "#container8 > div.satellite5 > h3 > input[type=text]"
        ).value;
        final4.push(
          "ACPCore.trackState(" +
            "'" +
            state2 +
            "'," +
            " {" +
            "'" +
            o4[j] +
            "'" +
            ":" +
            "'" +
            u4[j] +
            "'" +
            "});"
        );
      }
      document.querySelector("#showbox5").value = final4.join("\r\n");
    } else if (Find == "container8" && buttonName == "Show Track Action") {
      document.querySelector(".showbox5").style.display = "contents";
      var l4 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l4; i++) {
        var value4 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key4 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value4 == true) {
          var realvalue4 = document.getElementsByTagName("input")[i].value;
          if (u4.indexOf(realvalue4) == -1 && realvalue4 != "") {
            u4.push(realvalue4);
          }
        } else if (key4 == true) {
          var realkey4 = document.getElementsByTagName("input")[i].value;
          if (o4.indexOf(realkey4) == -1 && realkey4 != "") {
            o4.push(realkey4);
          }
        }
      }
      for (var j = 0; j < u4.length; j++) {
        var state3 = document.querySelector(
          "#container8 > div.satellite5 > h3 > input[type=text]"
        ).value;
        final4.push(
          "ACPCore.trackAction(" +
            "'" +
            state3 +
            "'," +
            " {" +
            "'" +
            o4[j] +
            "'" +
            ":" +
            "'" +
            u4[j] +
            "'" +
            "});"
        );
      }
      document.querySelector("#showbox5").value = final4.join("\r\n");
    } else if (buttonName == "Insert") {
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document.querySelector("#showbox5").value;
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox5").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form4")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form4").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (Find == "container9") {
    var u5 = [];
    var o5 = [];
    var final5 = [];
    var localkey2 = [];
    if (buttonName == "+") {
      var newKey5 = document.createElement("input");
      newKey5.type = "text";
      newKey5.placeholder = "Key";
      var newText5 = document.createTextNode("  :  ");
      var newValue5 = document.createElement("input");
      newValue5.type = "text";
      newValue5.placeholder = "Value";
      document.getElementById("Form5").appendChild(newKey5);
      document.getElementById("Form5").appendChild(newText5);
      document.getElementById("Form5").appendChild(newValue5);
    } else if (buttonName == "-") {
      var a5 = document.getElementById("Form5");
      var b5 = a5.lastChild.innerHTML;
      if (b5 == "") {
        for (var i = 0; i < 3; i++) {
          a5.removeChild(a5.lastChild);
        }
      } else if (b5 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container9" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#container9 > div:nth-child(1) > h4 > span"
      ).textContent;
      var cordovaproperty = document.querySelector(
        "#container9 > div:nth-child(1) > h4 > select.dropdown61"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (cordovaproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && cordovaproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (cordovaproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey2.push(realkey);
              var lenopti = document.querySelector(
                "#container9 > div:nth-child(1) > h4 > select.dropdown61"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#container9 > div:nth-child(1) > h4 > select.dropdown61"
                )[j].value;
                var match = localkey2.indexOf(optival) > -1;
                if (match == false) {
                  localkey2.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey2.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container9" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#container9 > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#container9 > div:nth-child(1) > h4 > select.dropdown61"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container9 > div:nth-child(1) > h4 > select.dropdown61"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#container9 > div:nth-child(1) > h4 > select.dropdown61"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container9 > div:nth-child(1) > h4 > select.dropdown61"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (Find == "container9" && buttonName == "Show Track State") {
      document.querySelector(".showbox6").style.display = "contents";
      var l5 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l5; i++) {
        var value5 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key5 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value5 == true) {
          var realvalue5 = document.getElementsByTagName("input")[i].value;
          if (u5.indexOf(realvalue5) == -1 && realvalue5 != "") {
            u5.push(realvalue5);
          }
        } else if (key5 == true) {
          var realkey5 = document.getElementsByTagName("input")[i].value;
          if (o5.indexOf(realkey5) == -1 && realkey5 != "") {
            o5.push(realkey5);
          }
        }
      }
      for (var j = 0; j < u5.length; j++) {
        var state3 = document.querySelector(
          "#container9 > div.satellite6 > h3 > input[type=text]"
        ).value;
        final5.push(
          "ACPCore.trackState(" +
            "'" +
            state3 +
            "'," +
            " {" +
            "'" +
            o5[j] +
            "'" +
            ":" +
            "'" +
            u5[j] +
            "'" +
            "},successCallback, errorCallback);"
        );
      }
      document.querySelector("#showbox6").value = final5.join("\r\n");
    } else if (Find == "container9" && buttonName == "Show Track Action") {
      document.querySelector(".showbox6").style.display = "contents";
      var l5 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l5; i++) {
        var value5 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key5 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value5 == true) {
          var realvalue5 = document.getElementsByTagName("input")[i].value;
          if (u5.indexOf(realvalue5) == -1 && realvalue5 != "") {
            u5.push(realvalue5);
          }
        } else if (key5 == true) {
          var realkey5 = document.getElementsByTagName("input")[i].value;
          if (o5.indexOf(realkey5) == -1 && realkey5 != "") {
            o5.push(realkey5);
          }
        }
      }
      for (var j = 0; j < u5.length; j++) {
        var state4 = document.querySelector(
          "#container9 > div.satellite6 > h3 > input[type=text]"
        ).value;
        final5.push(
          "ACPCore.trackAction(" +
            "'" +
            state4 +
            "'," +
            " {" +
            "'" +
            o5[j] +
            "'" +
            ":" +
            "'" +
            u5[j] +
            "'" +
            "},successCallback, errorCallback);"
        );
      }
      document.querySelector("#showbox6").value = final5.join("\r\n");
    } else if (buttonName == "Insert") {
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document.querySelector("#showbox6").value;
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox6").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form5")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form5").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (Find == "container10") {
    var u6 = [];
    var o6 = [];
    var final6 = [];
    var localkey2 = [];
    if (buttonName == "+") {
      var newKey6 = document.createElement("input");
      newKey6.type = "text";
      newKey6.placeholder = "Key";
      var newText6 = document.createTextNode("  :  ");
      var newValue6 = document.createElement("input");
      newValue6.type = "text";
      newValue6.placeholder = "Value";
      document.getElementById("Form6").appendChild(newKey6);
      document.getElementById("Form6").appendChild(newText6);
      document.getElementById("Form6").appendChild(newValue6);
    } else if (buttonName == "-") {
      var a6 = document.getElementById("Form6");
      var b6 = a6.lastChild.innerHTML;
      if (b6 == "") {
        for (var i = 0; i < 3; i++) {
          a6.removeChild(a6.lastChild);
        }
      } else if (b6 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container10" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#container10 > div:nth-child(1) > h4 > span"
      ).textContent;
      var unityproperty = document.querySelector(
        "#container10 > div:nth-child(1) > h4 > select.dropdown71"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (unityproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && unityproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (unityproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey2.push(realkey);
              var lenopti = document.querySelector(
                "#container10 > div:nth-child(1) > h4 > select.dropdown71"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#container10 > div:nth-child(1) > h4 > select.dropdown71"
                )[j].value;
                var match = localkey2.indexOf(optival) > -1;
                if (match == false) {
                  localkey2.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey2.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container10" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#container10 > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#container10 > div:nth-child(1) > h4 > select.dropdown71"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container10 > div:nth-child(1) > h4 > select.dropdown71"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#container10 > div:nth-child(1) > h4 > select.dropdown71"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container10 > div:nth-child(1) > h4 > select.dropdown71"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (Find == "container10" && buttonName == "Show Track State") {
      document.querySelector(".showbox7").style.display = "contents";
      var l6 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l6; i++) {
        var value6 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key6 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value6 == true) {
          var realvalue6 = document.getElementsByTagName("input")[i].value;
          if (u6.indexOf(realvalue6) == -1 && realvalue6 != "") {
            u6.push(realvalue6);
          }
        } else if (key6 == true) {
          var realkey6 = document.getElementsByTagName("input")[i].value;
          if (o6.indexOf(realkey6) == -1 && realkey6 != "") {
            o6.push(realkey6);
          }
        }
      }
      for (var j = 0; j < u6.length; j++) {
        final6.push(
          "contextData.Add(" + "'" + o6[j] + "'" + ":" + "'" + u6[j] + "');"
        );
      }
      var state4 = document.querySelector(
        "#container10 > div.satellite7 > h3 > input[type=text]"
      ).value;
      document.querySelector("#showbox7").value =
        "var contextData = new Dictionary<string, string>();\n" +
        final6.join("\r\n") +
        "\nACPCore.TrackState(" +
        "'" +
        state4 +
        "', ContextData);";
    } else if (Find == "container10" && buttonName == "Show Track Action") {
      document.querySelector(".showbox7").style.display = "contents";
      var l6 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l6; i++) {
        var value6 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key6 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value6 == true) {
          var realvalue6 = document.getElementsByTagName("input")[i].value;
          if (u6.indexOf(realvalue6) == -1 && realvalue6 != "") {
            u6.push(realvalue6);
          }
        } else if (key6 == true) {
          var realkey6 = document.getElementsByTagName("input")[i].value;
          if (o6.indexOf(realkey6) == -1 && realkey6 != "") {
            o6.push(realkey6);
          }
        }
      }
      for (var j = 0; j < u6.length; j++) {
        final6.push(
          "contextData.Add(" + "'" + o6[j] + "'" + ":" + "'" + u6[j] + "');"
        );
      }
      var state5 = document.querySelector(
        "#container10 > div.satellite7 > h3 > input[type=text]"
      ).value;
      document.querySelector("#showbox7").value =
        "var contextData = new Dictionary<string, string>();\n" +
        final6.join("\r\n") +
        "\nACPCore.TrackAction(" +
        "'" +
        state5 +
        "', ContextData);";
    } else if (buttonName == "Insert") {
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document.querySelector("#showbox7").value;
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox7").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form6")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form6").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (Find == "container11") {
    var u7 = [];
    var o7 = [];
    var final7 = [];
    var final77 = [];
    var localkey2 = [];
    if (buttonName == "+") {
      var newKey7 = document.createElement("input");
      newKey7.type = "text";
      newKey7.placeholder = "Key";
      var newText7 = document.createTextNode("  :  ");
      var newValue7 = document.createElement("input");
      newValue7.type = "text";
      newValue7.placeholder = "Value";
      document.getElementById("Form7").appendChild(newKey7);
      document.getElementById("Form7").appendChild(newText7);
      document.getElementById("Form7").appendChild(newValue7);
    } else if (buttonName == "-") {
      var a7 = document.getElementById("Form7");
      var b7 = a7.lastChild.innerHTML;
      if (b7 == "") {
        for (var i = 0; i < 3; i++) {
          a7.removeChild(a7.lastChild);
        }
      } else if (b7 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container11" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#container11 > div:nth-child(1) > h4 > span"
      ).textContent;
      var xamproperty = document.querySelector(
        "#container11 > div:nth-child(1) > h4 > select.dropdown81"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (xamproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && xamproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (xamproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey2.push(realkey);
              var lenopti = document.querySelector(
                "#container11 > div:nth-child(1) > h4 > select.dropdown81"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#container11 > div:nth-child(1) > h4 > select.dropdown81"
                )[j].value;
                var match = localkey2.indexOf(optival) > -1;
                if (match == false) {
                  localkey2.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey2.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container11" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#container11 > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#container11 > div:nth-child(1) > h4 > select.dropdown81"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container11 > div:nth-child(1) > h4 > select.dropdown81"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#container11 > div:nth-child(1) > h4 > select.dropdown81"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container11 > div:nth-child(1) > h4 > select.dropdown81"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (Find == "container11" && buttonName == "Show Track State") {
      document.querySelector(".showbox8").style.display = "contents";
      var l7 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l7; i++) {
        var value7 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key7 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value7 == true) {
          var realvalue7 = document.getElementsByTagName("input")[i].value;
          if (u7.indexOf(realvalue7) == -1 && realvalue7 != "") {
            u7.push(realvalue7);
          }
        } else if (key7 == true) {
          var realkey7 = document.getElementsByTagName("input")[i].value;
          if (o7.indexOf(realkey7) == -1 && realkey7 != "") {
            o7.push(realkey7);
          }
        }
      }
      for (var j = 0; j < u7.length; j++) {
        final7.push(
          "data.Add(" + "'" + o7[j] + "'" + "," + "'" + u7[j] + "');"
        );
        final77.push(
          "{[" + "'" + o7[j] + "'] = new NSString(" + "'" + u7[j] + "')};"
        );
      }
      var state6 = document.querySelector(
        "#container11 > div.satellite8 > h3 > input[type=text]"
      ).value;
      document.querySelector("#showbox8").value =
        "Android \n\nvar data = new Dictionary<string, string>();\n" +
        final7.join("\r\n") +
        "\nACPCore.TrackState(" +
        "'" +
        state6 +
        "', data);\n\n" +
        "iOS\n\nvar data = new NSMutableDictionary<NSString, NSString>" +
        final77.join("\r\n") +
        "\nACPCore.TrackState(" +
        "'" +
        state6 +
        "', data);\n\n";
    } else if (Find == "container11" && buttonName == "Show Track Action") {
      document.querySelector(".showbox8").style.display = "contents";
      var l7 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l7; i++) {
        var value7 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key7 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value7 == true) {
          var realvalue7 = document.getElementsByTagName("input")[i].value;
          if (u7.indexOf(realvalue7) == -1 && realvalue7 != "") {
            u7.push(realvalue7);
          }
        } else if (key7 == true) {
          var realkey7 = document.getElementsByTagName("input")[i].value;
          if (o7.indexOf(realkey7) == -1 && realkey7 != "") {
            o7.push(realkey7);
          }
        }
      }
      for (var j = 0; j < u7.length; j++) {
        final7.push(
          "data.Add(" + "'" + o7[j] + "'" + "," + "'" + u7[j] + "');"
        );
        final77.push(
          "\n{[" + "'" + o7[j] + "'] = new NSString(" + "'" + u7[j] + "')};"
        );
      }
      var state7 = document.querySelector(
        "#container11 > div.satellite8 > h3 > input[type=text]"
      ).value;
      document.querySelector("#showbox8").value =
        "Android \n\nvar data = new Dictionary<string, string>();\n" +
        final7.join("\r\n") +
        "\nACPCore.TrackAction(" +
        "'" +
        state7 +
        "', data);\n\n" +
        "iOS\n\nvar data = new NSMutableDictionary<NSString, NSString>" +
        final77.join("\r\n") +
        "\nACPCore.TrackAction(" +
        "'" +
        state7 +
        "', data);\n\n";
    } else if (buttonName == "Insert - Android") {
      var Androidpost = document.querySelector("#showbox8").value.search("iOS");
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document
          .querySelector("#showbox8")
          .value.slice(0, Androidpost);
        return context.sync();
      });
    } else if (buttonName == "Insert - iOS") {
      var Androidpost = document.querySelector("#showbox8").value.search("iOS");
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document
          .querySelector("#showbox8")
          .value.slice(Androidpost);
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox8").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form7")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form7").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (Find == "container12") {
    var u8 = [];
    var o8 = [];
    var final8 = [];
    var localkey2 = [];
    if (buttonName == "+") {
      var newKey8 = document.createElement("input");
      newKey8.type = "text";
      newKey8.placeholder = "Key";
      var newText8 = document.createTextNode("  :  ");
      var newValue8 = document.createElement("input");
      newValue8.type = "text";
      newValue8.placeholder = "Value";
      document.getElementById("Form8").appendChild(newKey8);
      document.getElementById("Form8").appendChild(newText8);
      document.getElementById("Form8").appendChild(newValue8);
    } else if (buttonName == "-") {
      var a8 = document.getElementById("Form8");
      var b8 = a8.lastChild.innerHTML;
      if (b8 == "") {
        for (var i = 0; i < 3; i++) {
          a8.removeChild(a8.lastChild);
        }
      } else if (b8 == "-") {
        console.log("This is the last field");
      }
    } else if (Find == "container12" && buttonName == "Store Keys") {
      var lenKeys = document.getElementsByTagName("input").length;
      var localprop = document.querySelector(
        "#container12 > div:nth-child(1) > h4 > span"
      ).textContent;
      var flutproperty = document.querySelector(
        "#container12 > div:nth-child(1) > h4 > select.dropdown91"
      ).length;
      var findprop = typeof localStorage.getItem(localprop);
      if (localprop != "") {
        if (flutproperty == 0 && findprop != "object") {
          alert(
            "Please restore the previous keys of this property by click on restore and then click on store button to store the latest keys of the same"
          );
        } else if (findprop == "object" && flutproperty == 0) {
          localStorage.setItem(localprop, "");
          alert(
            "As we have initialized the propertyName now you need to click on restore keys button and then continue to add keys and store... "
          );
        } else if (flutproperty != 0) {
          for (var i = 0; i < lenKeys; i++) {
            var keyval = document.getElementsByTagName("input")[i].value;
            var key =
              document
                .getElementsByTagName("input")
                [i].getAttribute("placeholder") == "Key";
            if (keyval != " " && key == true) {
              var realkey = document.getElementsByTagName("input")[i].value;
              localkey2.push(realkey);
              var lenopti = document.querySelector(
                "#container12 > div:nth-child(1) > h4 > select.dropdown91"
              ).length;
              for (var j = 0; j < lenopti; j++) {
                var optival = document.querySelector(
                  "#container12 > div:nth-child(1) > h4 > select.dropdown91"
                )[j].value;
                var match = localkey2.indexOf(optival) > -1;
                if (match == false) {
                  localkey2.push(optival);
                }
              }
            }
          }

          Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };

          Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          };
          var non = localkey2.unique();
          var non1 = non.filter((element) => element > " ");
          localStorage.setItem(localprop, non1);
        }
      } else if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      }
    } else if (Find == "container12" && buttonName == "Restore Keys") {
      var localprop = document.querySelector(
        "#container12 > div:nth-child(1) > h4 > span"
      ).textContent;

      if (localprop == "") {
        alert("No Property is been Selected so please select the property");
      } else if (localprop != "") {
        if (typeof localStorage.getItem(localprop) == "object") {
          alert(
            "There is no previous keys stored for this property please click on Store Keys to intialize the Property Name"
          );
        } else if (typeof localStorage.getItem(localprop) != "object") {
          var keyvalu = localStorage.getItem(localprop).split(",");
          var keyvalulen = keyvalu.length;
          var droplen = document.querySelector(
            "#container12 > div:nth-child(1) > h4 > select.dropdown91"
          ).length;

          if (droplen == 0) {
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container12 > div:nth-child(1) > h4 > select.dropdown91"
                )
                .append(opt);
            }
          } else if (droplen != 0) {
            document.querySelector(
              "#container12 > div:nth-child(1) > h4 > select.dropdown91"
            ).innerHTML = "";
            for (var i = 0; i < keyvalulen; i++) {
              var opt = document.createElement("option");
              opt.label = keyvalu[i];
              opt.value = keyvalu[i];
              document
                .querySelector(
                  "#container12 > div:nth-child(1) > h4 > select.dropdown91"
                )
                .append(opt);
            }
          }
        }
      }
    } else if (Find == "container12" && buttonName == "Show Track State") {
      document.querySelector(".showbox9").style.display = "contents";
      var l8 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l8; i++) {
        var value8 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key8 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value8 == true) {
          var realvalue8 = document.getElementsByTagName("input")[i].value;
          if (u8.indexOf(realvalue8) == -1 && realvalue8 != "") {
            u8.push(realvalue8);
          }
        } else if (key8 == true) {
          var realkey8 = document.getElementsByTagName("input")[i].value;
          if (o8.indexOf(realkey8) == -1 && realkey8 != "") {
            o8.push(realkey8);
          }
        }
      }
      for (var j = 0; j < u8.length; j++) {
        var state8 = document.querySelector(
          "#container12 > div.satellite9 > h3 > input[type=text]"
        ).value;
        final8.push(
          "FlutterACPCore.trackState(" +
            "'" +
            state8 +
            "'," +
            "data: {" +
            "'" +
            o8[j] +
            "'" +
            ":" +
            "'" +
            u8[j] +
            "'" +
            "});"
        );
      }
      document.querySelector("#showbox9").value = final8.join("\r\n");
    } else if (Find == "container12" && buttonName == "Show Track Action") {
      document.querySelector(".showbox9").style.display = "contents";
      var l8 = document.getElementsByTagName("input").length;
      for (var i = 0; i < l8; i++) {
        var value8 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Value";
        var key8 =
          document
            .getElementsByTagName("input")
            [i].getAttribute("placeholder") == "Key";
        if (value8 == true) {
          var realvalue8 = document.getElementsByTagName("input")[i].value;
          if (u8.indexOf(realvalue8) == -1 && realvalue8 != "") {
            u8.push(realvalue8);
          }
        } else if (key8 == true) {
          var realkey8 = document.getElementsByTagName("input")[i].value;
          if (o8.indexOf(realkey8) == -1 && realkey8 != "") {
            o8.push(realkey8);
          }
        }
      }
      for (var j = 0; j < u8.length; j++) {
        var state9 = document.querySelector(
          "#container12 > div.satellite9 > h3 > input[type=text]"
        ).value;
        final8.push(
          "FlutterACPCore.trackAction(" +
            "'" +
            state9 +
            "'," +
            "data: {" +
            "'" +
            o8[j] +
            "'" +
            ":" +
            "'" +
            u8[j] +
            "'" +
            "});"
        );
      }
      document.querySelector("#showbox9").value = final8.join("\r\n");
    } else if (buttonName == "Insert") {
      return Excel.run(function (context) {
        var range = context.workbook.getSelectedRange();
        range.values = document.querySelector("#showbox9").value;
        return context.sync();
      });
    } else if (buttonName == "Clear") {
      document.querySelector("#showbox9").value = "";
    } else if (buttonName == "Clear Fields") {
      var textboxlen = document
        .querySelector("#Form8")
        .getElementsByTagName("input").length;
      for (var i = 0; i < textboxlen; i++) {
        document.querySelector("#Form8").getElementsByTagName("input")[
          i
        ].value = "";
      }
    }
  } else if (buttonName == "New") {
    var typeloc = typeof localStorage.PropertyName == "undefined";
    if (typeloc == true) {
      alert(
        "Create a new property by click on store button to initialize the key "
      );
    } else if (typeloc != true) {
      var valu5 = document.querySelector("#newproperty").value;
      var valu = valu5.toUpperCase();
      document.querySelector("#newproperty").value = "";
      var compare = localStorage.PropertyName.indexOf(valu) > -1;
      var len = document.getElementsByTagName("option").length;
      for (var i = 0; i < len; i++) {
        var g = document.getElementsByTagName("option")[i].value;
        var truth = g.includes(valu);
      }
      if (compare == true || truth == true) {
        alert("Please don't enter null properties");
      } else if (compare == false || truth == false) {
        var newoption = document.createElement("option");
        newoption.label = valu;
        newoption.type = "text";
        newoption.value = valu;
        document.querySelector(".dropdown").appendChild(newoption);
      }
    }
  } else if (buttonName == "Re-Store") {
    if (typeof localStorage.PropertyName == "undefined") {
      alert("There is no property exists please create new property");
    } else if (typeof localStorage.PropertyName != "undefined") {
      var typelocal1 = localStorage.PropertyName == "";
      if (typelocal1 == true) {
        alert(
          "There is no previous properties please create new property by click on New"
        );
      } else if (typelocal1 != true) {
        var property = localStorage.PropertyName.split(",");
        var len3 = property.length;
        var none = document.getElementsByTagName("option").length;
        if (none == 0) {
          for (var i = 0; i < len3; i++) {
            var newoption = document.createElement("option");
            newoption.label = property[i];
            newoption.type = "text";
            newoption.value = property[i];
            document.querySelector(".dropdown").appendChild(newoption);
          }
        }
      }
    }
  } else if (buttonName == "Store") {
    var lendrop12 = document.querySelector(
      "body > div.properydropdown > select.dropdown"
    ).length;
    var locallen = typeof localStorage.PropertyName;
    if (lendrop12 == 0) {
      if (locallen != "undefined") {
        alert("Please click on restore to fetech the previous properties");
      } else if (locallen == "undefined") {
        var arr0 = [];
        var len = document.getElementsByTagName("option").length;
        if (len == 0) {
          var newoption4 = document.createElement("option");
          newoption4.label = "None";
          newoption4.type = "text";
          newoption4.value = "None";
          document.querySelector(".dropdown").appendChild(newoption4);
        } else if (len != 0) {
          for (var i = 0; i < len; i++) {
            var val = document.getElementsByTagName("option")[i].value;
            var realval = val.toUpperCase();
            if (realval != "NONE") {
              arr0.push(realval);
            }
          }
        }
        var uni14 = arr0.filter((element) => element > " ");

        localStorage.setItem("PropertyName", uni14);
      }
    } else if (lendrop12 != 0) {
      var arr0 = [];
      var len = document.getElementsByTagName("option").length;
      if (len == 0) {
        var newoption4 = document.createElement("option");
        newoption4.label = "None";
        newoption4.type = "text";
        newoption4.value = "None";
        document.querySelector(".dropdown").appendChild(newoption4);
      } else if (len != 0) {
        for (var i = 0; i < len; i++) {
          var val = document.getElementsByTagName("option")[i].value;
          var realval = val.toUpperCase();
          if (realval != "NONE") {
            arr0.push(realval);
          }
        }
      }
      var uni14 = arr0.filter((element) => element > " ");

      localStorage.setItem("PropertyName", uni14);
    }
  }
});
