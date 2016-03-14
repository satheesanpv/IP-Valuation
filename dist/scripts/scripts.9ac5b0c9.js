"use strict";angular.module("ipValuationApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","autocomplete"]).constant("AUTH_EVENTS",{loginSuccess:"auth-login-success",loginFailed:"auth-login-failed",logoutSuccess:"auth-logout-success",sessionTimeout:"auth-session-timeout",notAuthenticated:"auth-not-authenticated",notAuthorized:"auth-not-authorized"}).constant("API","api").constant("USER_ROLES",{all:"*",admin:"admin",editor:"editor",guest:"guest"}).config(["$routeProvider","USER_ROLES",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/valuation/",{templateUrl:"views/valuation.html",controller:"ValuationCtrl",requireLogin:!0}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/createUser/",{templateUrl:"views/createuser.html",controller:"CreateuserCtrl",controllerAs:"ctrl",requireLogin:!0,data:{authorizedRoles:[b.admin]}}).when("/myValuations",{templateUrl:"views/myvaluations.html",controller:"MyvaluationsCtrl",requireLogin:!0}).when("/allValuations",{templateUrl:"views/myvaluations.html",controller:"MyvaluationsCtrl",data:{authorizedRoles:[b.admin],type:"All"}}).when("/view/:id",{templateUrl:"views/view.html",controller:"ViewCtrl",requireLogin:!0}).when("/changePassword",{templateUrl:"views/changepassword.html",controller:"ChangepasswordCtrl",controllerAs:"ctrl",requireLogin:!0}).when("/editInstitutes",{templateUrl:"views/editinstitutes.html",controller:"EditinstitutesCtrl",requireLogin:!0,controllerAs:"ctrl",data:{authorizedRoles:[b.admin],type:"All"}}).when("/profile/:id?/:action?",{templateUrl:"views/profile.html",controller:"ProfileCtrl",controllerAs:"ctrl",requireLogin:!0}).when("/userList",{templateUrl:"views/userlist.html",controller:"UserlistCtrl",controllerAs:"ctrl",requireLogin:!0,data:{authorizedRoles:[b.admin]}}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(a){a.interceptors.push("authInterceptor")}]).run(["$rootScope","$location","authService","userService",function(a,b,c,d){a.storedRoute={returnToNext:{},returnToUrl:""},a.$on("$routeChangeStart",function(e,f,g){if(f&&f.requireLogin&&!c.isAuthed())return a.storedRoute.returnToNext=f,a.storedRoute.returnToUrl=b.url(),void b.path("/login");if(g&&f&&f.originalPath!==g.originalPath&&c.isAuthed()&&a.storedRoute.returnToUrl.length){var h=a.storedRoute.returnToUrl;return a.storedRoute.returnToNext={},a.storedRoute.returnToUrl="",void b.url(h)}if(f.data&&f.data.authorizedRoles){var i=f.data.authorizedRoles;d.isAuthorized(i)||(e.preventDefault(),console.log("Not authroised to view this"),b.path("/login"))}})}]).filter("percentage",["$filter",function(a){return function(b,c){return b?a("number")(b,c)+"%":void 0}}]).filter("useFilter",["$filter",function(a){return function(){var b=[].splice.call(arguments,1,1)[0]||"filter",c=b.split(":");if("currency"===b)return[].push.call(arguments,""),a(b).apply(null,arguments);if(c.length>1){b=c[0];for(var d=1,e=c.length;e>d;d++)[].push.call(arguments,c[d])}try{return a(b).apply(null,arguments)}catch(f){return console.log(f),a("filter").apply(null,arguments)}}}]),angular.module("ipValuationApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("ipValuationApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("ipValuationApp").controller("ValuationCtrl",["$scope","$window","dataService","$filter","$route","$timeout","userService","configuration","$location",function(a,b,c,d,e,f,g,h,i){var j=this,k=b.jQuery,l=g.getUser();return k("input").focus(function(){var a=k(this);j.scrollTo(a)}),j.showResult?(j.showResult=!1,void e.reload()):(j.instituteList=[],j.technologies=h.technologies,j.growthRate=h.growthRate,j.priceRate=h.priceRate,j.inputFields=h.inputFields,j.scrollTo=function(a){a.offset().top-k(window).scrollTop()<80&&k("html, body").animate({scrollTop:a.offset().top-80},0)},j.showError=!1,j.techTypes=j.technologies[0].types,j.ipCategoryValues=["Product Patent","Process Patent","Copyright"],j.ipStateValues=["Patent Granted","Patent Filed","Discussion Started"],j.methodValues=["All","Cost Method","Market Method","Profit Split Method","Royalty Method"],j.pricingStratagy=["Same as competing product","Skimming","Penetrating","NA"],j.expectedGrowth=["Business as Usual","Slow pace of technology adoption","Upside scenario","NA"],j.changeRate=function(a){var b,c;"pricingStratagy"===a&&(j.data.pr=j.priceRate[j.data.pricingStratagy],b=k("#pr"),c=j.data.pricingStratagy),"expectedGrowth"===a&&(j.data.g=j.growthRate[j.data.expectedGrowth],b=k("#g"),c=j.data.expectedGrowth),"Manual"!==c?b.prop("disabled",!0):(b.prop("disabled",!1),b.focus())},j.changeFields=function(){if("all"===j.data.valuationMethod.toLocaleLowerCase())j.selectedFields=[],angular.forEach(j.inputFields,function(a){j.selectedFields=j.selectedFields.concat(a)});else{var a=d("filter")(j.inputFields.common,{methods:j.data.valuationMethod.toLocaleLowerCase()},!0);j.selectedFields=angular.copy(a),j.selectedFields=j.selectedFields.concat(j.inputFields[j.data.valuationMethod.toLocaleLowerCase()])}j.data.pricingStratagy=j.pricingStratagy[0],j.data.expectedGrowth=j.expectedGrowth[0],f(function(){j.changeRate("pricingStratagy"),j.changeRate("expectedGrowth")},0)},c.getData().then(function(a){j.data=a,console.log(a),j.data||(j.data={},j.data.technology=j.technologies[0].name,j.data.techType=j.techTypes[0],j.data.ipCategory=j.ipCategoryValues[0],j.data.ipState=j.ipStateValues[0],j.data.valuationMethod="Royalty Method",j.selectedFields=j.inputFields.common,j.data.pricingStratagy=j.pricingStratagy[0],j.data.expectedGrowth=j.expectedGrowth[0],j.data.ry=10,j.data.userId=g.getId(),j.data.idvaluation=null,j.data.developedBy=l.name,j.data.contactEmail=l.email,j.data.contactMobile=l.mobile),j.changeFields()}),c.getConfig("institutes").then(function(a){angular.forEach(a,function(a){var b=k.grep([a.name,a.location,a.district,a.state],Boolean).join(", ");j.instituteList.push(b)})}),j.showForm=!0,j.showResult=!1,j.changeTechTypes=function(){j.techTypes=d("filter")(j.technologies,{name:j.data.technology},!0)[0].types,j.techTypes.push("Other"),j.data.techType=j.techTypes[0]},void(j.submitForm=function(a){j.showError=!1,a?c.valuate(j.data).then(function(a){i.path("/view/"+a.idvaluation)},function(){j.errMsg="Unable to process the request now. Please try again later",j.showError=!0,j.scrollTo(k("body"))}):j.submitted=!0}))}]),angular.module("ipValuationApp").controller("LoginCtrl",["$scope","$rootScope","AUTH_EVENTS","userService","$location","authService",function(a,b,c,d,e,f){a.credentials={username:"",password:""},f.isAuthed()&&e.path("#/home"),a.login=function(){a.loginFailed=!1,d.login(a.credentials).then(function(a){b.$broadcast(c.loginSuccess),console.log("Login success"),e.path("#/home"),console.log(e.path())},function(){b.$broadcast(c.loginFailed),a.loginFailed=!0})}}]),angular.module("ipValuationApp").service("authService",["$window","$timeout","AUTH_EVENTS","$rootScope",function(a,b,c,d){var e=this;e.parseJwt=function(b){var c=b.split(".")[1],d=c.replace("-","+").replace("_","/");return JSON.parse(a.atob(d))},e.saveToken=function(b){console.log("save token: "+b),a.sessionStorage.jwtToken=b},e.getToken=function(){return a.sessionStorage.jwtToken},e.isAuthed=function(){var a=e.getToken();if(a){var b=e.parseJwt(a);return Math.round((new Date).getTime()/1e3)<=b.exp}return!1},e.logout=function(){a.sessionStorage.removeItem("jwtToken"),b(function(){d.$broadcast(c.logoutSuccess)},0)},e.getSavedUser=function(){if(e.isAuthed()){var a={},b=e.getToken();if(b){var c=e.parseJwt(b);console.log(c),a=c.data}return a}}}]),angular.module("ipValuationApp").controller("HeaderCtrl",["$scope","userService","authService","$location","AUTH_EVENTS",function(a,b,c,d,e){a.isLoggedIn=!1,a.$on(e.loginSuccess,function(){console.log("User logged in "),a.user=b.getUser(),a.isLoggedIn=!0}),a.$on(e.logoutSuccess,function(){console.log("User logged out"),a.isLoggedIn=!1}),a.logout=function(){c.logout(),a.isLoggedIn=!1,d.path("/home")},a.isAdmin=function(){return"admin"===a.user.role.toLowerCase()?!0:!1}}]),angular.module("ipValuationApp").service("userService",["$http","authService","$window","$rootScope","AUTH_EVENTS","$timeout","configuration",function(a,b,c,d,e,f,g){function h(){console.log("Auto login"),b.isAuthed()&&(i=b.getSavedUser(),f(function(){d.$broadcast(e.loginSuccess)},0))}var i={},j=this,k=g.apiBase;h(),j.login=function(b){return a.post(k+"/login.php",b).then(function(a){return i=a.data.user,a.data.user})},j.createUser=function(b){return a.post(k+"/create_user.php",b).then(function(a){return a.data})},j.fetch=function(b){var c=k+"/get_user.php";return b&&(c+="?id="+b),a.get(c).then(function(a){return a.data})},j.changePassword=function(b){return a.post(k+"/change_password.php",b).then(function(a){return a.data})},j.updateProfile=function(b){return a.post(k+"/update_profile.php",b).then(function(a){return b.iduser===i.iduser&&(i=b),a.data})},j.getUser=function(){return i},j.getRole=function(){return i.role},j.getId=function(){return i.iduser},j.getName=function(){return i.name},j.logout=function(){},j.isAuthorized=function(a){return angular.isArray(a)||(a=[a]),b.isAuthed()&&-1!==a.indexOf(j.getRole().toLowerCase())}}]),angular.module("ipValuationApp").factory("authInterceptor",["authService","API","$location","$q","$injector","$rootScope",function(a,b,c,d,e,f){return{response:function(c){return console.log(c.config.url),console.log(b),c.config.url.indexOf(b)>0&&c.data.token&&a.saveToken(c.data.token),c},request:function(c){var d=a.getToken();return c.url.indexOf(b)>0&&d&&(c.headers.Authorization="Bearer "+d),console.log(d),c},responseError:function(b){if(401===b.status||403===b.status){var g=e.get("$route");"/login"!==c.path()&&(f.storedRoute.returnToNext=g.current,f.storedRoute.returnToUrl=c.url()),a.logout(),c.path("/login")}return d.reject(b)}}}]),angular.module("ipValuationApp").controller("CreateuserCtrl",["userService","$window","$route","dataService",function(a,b,c,d){var e=this,f=b.jQuery;return e.showResult?(e.showResult=!1,void c.reload()):(e.user={},e.showForm=!0,e.showError=!1,e.showResult=!1,e.user.role="User",e.instituteList=[],d.getConfig("institutes").then(function(a){angular.forEach(a,function(a){var b=f.grep([a.name,a.location,a.district,a.state],Boolean).join(", ");e.instituteList.push(b)})}),e.scrollTo=function(a){a.offset().top-f(window).scrollTop()<80&&f("html, body").animate({scrollTop:a.offset().top-80},0)},void(e.createUser=function(){a.createUser(e.user).then(function(a){"SUCCESS"===a.message?(e.showForm=!1,e.showResult=!0,e.user=a.user):(e.errMsg=a.message,e.showError=!0,e.scrollTo(f("body")))},function(){e.errMsg="Unable to process the request now. Please try again later",e.showError=!0,e.scrollTo(f("body"))})}))}]),angular.module("ipValuationApp").service("dataService",["$http","$q","configuration",function(a,b,c){var d=null,e=this,f=c.apiBase;e.getData=function(a){var c=b.defer();if(a){if(d&&a===d.idvaluation)return c.resolve(d),c.promise;e.fetchValuation(a).then(function(a){d=a[0],c.resolve(d)},function(a){c.reject(a)})}else c.resolve(d);return c.promise},e.fetch=function(b){return a.post(f+"/get_valuation.php",b).then(function(a){return a.data})},e.fetchValuations=function(a,b){return"All"===a?e.fetchAllValuations():e.fetchMyValuations(b)},e.fetchMyValuations=function(a){var b={userId:a};return e.fetch(b)},e.fetchValuation=function(a){var b={id:a};return e.fetch(b)},e.fetchAllValuations=function(){var a={};return e.fetch(a)},e.save=function(b){return b.action="SAVE",a.post(f+"/valuation.php",b).then(function(a){return d=a.data,a.data})},e.valuate=function(b){return d=b,a.post(f+"/valuation.php",b).then(function(a){return d=a.data,a.data})},e.getConfig=function(c){var d=b.defer();return a.post(f+"/get_config.php?name="+c).then(function(a){var b;b=c?a.data[0].data:a.data,d.resolve(b)},function(a){d.reject(a)}),d.promise},e.updateConfig=function(c,d){var e=b.defer(),g={};return g.key=c,g.value=d,a.post(f+"/update_config.php",g).then(function(){e.resolve("SUCCESS")},function(a){e.reject(a)}),e.promise}}]),angular.module("ipValuationApp").directive("toggle",function(){return{restrict:"A",link:function(a,b,c){"tooltip"===c.toggle&&$(b).tooltip(),"popover"===c.toggle&&$(b).popover({trigger:"hover"})}}}).directive("customAttr",["$compile",function(a){var b=function(b,c,d){angular.forEach(b.content,function(a,b){try{c.attr(b,a)}catch(d){}}),b.content.name&&c.attr("id",b.content.name),a(c.contents())(b)};return{restrict:"A",transclude:!0,scope:{content:"="},link:b}}]).directive("validPasswordC",function(){return{scope:{password:"=validPasswordC"},require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(b,c){var e=b!==a.password;return d.$setValidity("noMatch",!e),b}),a.$watch("password",function(a){d.$setValidity("noMatch",a===d.$viewValue)})}}}),angular.module("ipValuationApp").controller("MyvaluationsCtrl",["$scope","$route","dataService","userService",function(a,b,c,d){var e=this,f=d.getUser();e.data={},e.type="My",b.current.data&&(e.type=b.current.data.type),e.showResult=!1,e.isAdmin="All"===e.type,c.fetchValuations(e.type,f.iduser).then(function(a){e.data=a,e.showResult=!0,console.log(e.data)},function(){e.errMsg="No record found!!",e.showError=!0})}]),angular.module("ipValuationApp").controller("ViewCtrl",["$routeParams","dataService","$window","$location","configuration","$filter","userService",function(a,b,c,d,e,f,g){var h=this,i=c.jQuery,j=g.getUser();h.id=a.id,h.inputFields=e.inputFields,h.id||(h.errMsg="No Id found!!",h.showError=!0),h.selectFields=function(){if("all"===h.data.valuationMethod.toLocaleLowerCase())h.selectedFields=[],angular.forEach(h.inputFields,function(a){h.selectedFields=h.selectedFields.concat(a)});else{var a=f("filter")(h.inputFields.common,{methods:h.data.valuationMethod.toLocaleLowerCase()},!0);h.selectedFields=angular.copy(a),h.selectedFields=h.selectedFields.concat(h.inputFields[h.data.valuationMethod.toLocaleLowerCase()])}},b.getData(h.id).then(function(a){h.data=a,console.log(a),h.showResult=!0,h.selectFields(),console.log(h.data.userId),h.showEdit=h.data.userId===j.iduser,h.data||(h.errMsg="Unable to get Valuation data!!",h.showError=!0)},function(){h.errMsg="Unable to get valuation data!!",h.showError=!0}),h.editValuation=function(){d.path("/valuation")},h.downloadPdf=function(){var a=new c.jsPDF("p","pt","letter"),b="Decision Support System for IP Valuation";a.setFontSize(22),a.setTextColor(60,118,61),a.setFontType("bold");var d=a.getStringUnitWidth(b)*a.internal.getFontSize()/a.internal.scaleFactor,e=(a.internal.pageSize.width-d)/2;a.text(e,58,b),a.setTextColor(0);var f={"#editor":function(a,b){return!0}},g=i("#pdfResult").html(),h={top:70,bottom:10,left:40,width:522};a.fromHTML(g,h.left,h.top,{width:522,elementHandlers:f},function(b){a.save("valuation.pdf")},h)}}]),angular.module("ipValuationApp").constant("configuration",{apiBase:"http://localhost/ip/api",technologies:[{name:"Agriculture Engineering & ICT",types:["Machinery and Farm Equipments","Post Harvest processes and Products","Renewable Energy Gadgets","Irrigation and Water Management Equipments","Electronics","Softwares and DSS"]},{name:"Animal Science",types:["Animal Genetic Resources","Animal Production and Health","Animal Products Technology","Diagnostics and Vaccines"]},{name:"Fisheries",types:["Fish seed Production","	Fish Nutrition","Fish based food products","Fish based Biochemistry technologies"]},{name:"Horticulture",types:["Plant varieties","Crop Production and Propagation Technologies","Crop Protection technologies","Post Harvest and processing Technology"]},{name:"Crop Science",types:["Plant varities","Crop Production and Propagation Technologies","Crop Protection technologies","Post Harvest and processing Technology"]},{name:"Other",types:[]}],growthRate:{"Business as Usual":100.01,"Slow pace of technology adoption":100.1,"Upside scenario":101},priceRate:{"Same as competing product":100,Skimming:110,Penetrating:90},inputFields:{common:[{type:"number",step:.01,name:"fcr",label:"Fixed costs specific to R&D*",filter:"currency",methods:["cost method"],required:"required",helpText:"Fixed Assets/ Buildings/Machinery etc in INR"},{type:"number",name:"ifc",step:.01,label:"Incremental Fixed Costs",filter:"currency",methods:["cost method"],helpText:"Costs incurred if an already established equipment's/machinery had been used for R&D."},{type:"number",step:.01,name:"pp",label:"Price/Unit of Closly Compiting Product",filter:"currency",methods:["market method"],helpText:"Similar existing competing product price in INR"},{type:"number",step:.01,name:"pp",label:"Product Price (Per Unit)*",filter:"currency",methods:["royalty method","profit split method"],helpText:"Expected product price in INR"},{type:"number",step:.01,name:"sv",label:"Units Sold Annualy*",filter:"number",methods:["market method"],required:"required",helpText:"Expected Sales Volume of similar competing product similar product sales volume"},{type:"number",step:.01,name:"sv",label:"Sales Volumn*",filter:"number",methods:["royalty method","profit split method"],required:"required",helpText:"Expected Sales Volume of product annually"},{type:"number",step:.01,name:"r",label:"Revenue *",filter:"currency",methods:["market method","royalty method","profit split method"],helpText:"Expected Revenue of the product annually"},{type:"number",step:.01,name:"p",label:"Expected Profits (in Percentage)",filter:"percentage",methods:["cost method","market method"],helpText:"Margin expected as profits (In percentage)"},{type:"number",step:1,max:5,min:0,name:"yr",label:"Expected Life of Technology",methods:["royalty method","market method","profit split method"],helpText:"Value in years"},{type:"number",step:.1,name:"dr",label:"Discount Rate (%)",methods:["royalty method","market method"],filter:"percentage",helpText:"Prevailing Bank rate/Discount rate"},{type:"number",step:.01,min:0,max:100,name:"adc",label:"Administration Cost (yearly %)",filter:"percentage",methods:["market method"],helpText:"Costs incurred for administration purposes"},{type:"number",step:.01,min:0,max:100,name:"it",label:"Income Tax (per year %)",filter:"percentage",methods:["royalty method","market method"],helpText:"At Institute Level if any tax paid (in percentage)"},{type:"select",name:"expectedGrowth",label:"Expected Sales Growth",options:["Business as Usual","Slow pace of technology adoption","Upside scenario","Manual"],methods:["royalty method","market method","profit split method"],helpText:"Expected sales growth of the product yearly"},{type:"number",step:.01,min:0,max:200,name:"g",label:"Growth Rate (%)",filter:"percentage",methods:["royalty method","market method","profit split method"],required:"required",helpText:"Value in percentage"},{type:"select",name:"pricingStratagy",label:"Choice of pricing Strategy",options:["Same as competing product","Skimming","Penetrating","Manual"],methods:["royalty method","market method","profit split method"],helpText:"Expected change in price of the product yearly"},{type:"number",step:.01,min:0,max:200,name:"pr",label:"Pricing Factor (%)",filter:"percentage",methods:["royalty method","market method","profit split method"],required:"required",helpText:"Value in percentage. If the price of the product is x then next year product price will be x*(pf/100)"}],"cost method":[{type:"number",name:"fxa",label:"Fixed assets used for R&D",filter:"currency"},{type:"number",step:.01,min:0,max:100,name:"d",label:"Depreciation rate (%)",filter:"percentage",helpText:"Depreciation Rate of the Equipment's/machinery used for R&D. Rates Assumed for the equipments/machineries used. In Percentage"},{type:"number",step:.01,name:"oc",label:"Operating Expense( Value per year)",filter:"currency",helpText:"Expenses Incurred for the Day to Day activities. One Time value in INR"},{type:"number",step:.01,name:"s",label:"Salary",filter:"currency",helpText:"Expenses incurred as salaries to all associated Staff. Per Annum values in INR"},{type:"number",step:1,name:"t",label:"Time spent on R&D (in months)",helpText:"Time spent on development of the IP/Technology. Value in Months"},{type:"number",step:1,name:"op",label:"No. of Outputs from R&D"},{type:"number",step:.01,name:"oh",label:"Overheads (if any)",filter:"currency"}],"market method":[],"royalty method":[{type:"number",step:.01,name:"ry",label:"Royalty Rate (%)",filter:"percentage",helpText:"Expressed as percentage of Revenue"}],"profit split method":[{type:"number",step:.01,min:0,max:100,name:"psh",label:"Profit Share(%)",filter:"percentage",helpText:"Profit split rate[ 1:3 = 25% (1/(3+1))]"},{type:"number",step:.01,min:0,max:100,name:"opx",label:"Operating Expenses(%)",filter:"percentage"},{type:"number",step:.01,min:0,max:100,name:"ifx",label:"Incremental Fixed Costs(%)",filter:"percentage"}]}}),angular.module("ipValuationApp").controller("ChangepasswordCtrl",["$window","userService",function(a,b){var c=this,d=a.jQuery;c.user=b.getUser(),c.showForm=!0,c.showError=!1,c.showSuccess=!1,c.scrollTo=function(a){a.offset().top-d(window).scrollTop()<80&&d("html, body").animate({scrollTop:a.offset().top-80},0)},c.updatePassword=function(){b.changePassword(c.user).then(function(a){"SUCCESS"===a.message?(c.showSuccess=!0,c.showError=!1):(c.errMsg=a.message,c.showError=!0,c.showSuccess=!1,c.scrollTo(d("body")))},function(){c.errMsg="Unable to process the request now. Please try again later",c.showError=!0,c.scrollTo(d("body"))})}}]),angular.module("ipValuationApp").controller("EditinstitutesCtrl",["dataService","$filter","$scope",function(a,b,c){var d=this;d.isAdd=!1,d.institutes=[],d.selected={},d.showError=!1,d.showSuccess=!1,a.getConfig("institutes").then(function(a){d.institutes=a}),d.getTemplate=function(a){return a?"edit"===a.action?"edit":"remove"===a.action?"remove":"display":"add"},d.edit=function(a){d.showError=!1,d.showSuccess=!1,d.selected=angular.copy(d.institutes[a]),d.institutes[a].action="edit"},d.save=function(a){d.enableSave=!0,d.institutes[a]=angular.copy(d.selected),d.reset(a)},d.reset=function(a){d.isAdd=!1,console.log(a),a+1&&delete d.institutes[a].action,d.selected={}},d.showAdd=function(){d.isAdd=!0},d.add=function(){d.showError=!1,d.showSuccess=!1,d.enableSave=!0,d.institutes.unshift(angular.copy(d.selected)),d.reset()},d.remove=function(a){d.enableSave=!0,d.institutes[a].action="remove"},d.undoRemove=function(a){console.log(a),delete d.institutes[a].action},d.saveChanges=function(){d.updateList=b("filter")(d.institutes,{action:"!remove"}),d.updateList=b("orderBy")(d.updateList,"+name"),a.updateConfig("institutes",d.updateList).then(function(){d.institutes=d.updateList,d.showSuccess=!0,d.showError=!1,d.enableSave=!1},function(){d.errMsg="Unable to update institute list",d.showError=!0,d.showSuccess=!1})},c.$on("$locationChangeStart",function(a){if(d.enableSave){var b=window.confirm("Do you want to save your changes before leave this page?");b||(a.preventDefault(),d.saveChanges())}})}]),angular.module("ipValuationApp").controller("ProfileCtrl",["userService","$location","dataService","$timeout","$window","$routeParams",function(a,b,c,d,e,f){var g=this,h=e.jQuery;g.showProfile=!0,g.showEdit=!1,g.user=a.getUser(),g.isAdmin="Admin"===g.user.role,g.loading=!1;var i=f.id||g.user.iduser;return g.action=f.action,console.log(g.action),g.isAdmin||i===g.user.iduser?(i!==g.user.iduser&&(g.user={},g.loading=!0,g.showProfile=!1,g.showEdit=!1,a.fetch(i).then(function(a){g.user=a,g.user?(g.showProfile=!0,"edit"===g.action&&g.edit()):(g.showError=!0,g.errMsg="No user found!!")},function(){g.showError=!0,g.errMsg="Unable to get user information!!"})["finally"](function(){g.loading=!1})),g.instituteList=[],c.getConfig("institutes").then(function(a){angular.forEach(a,function(a){var b=h.grep([a.name,a.location,a.district,a.state],Boolean).join(", ");g.instituteList.push(b)})}),g.edit=function(){g.showProfile=!1,g.showEdit=!0},"edit"===g.action&&g.edit(),g.changePassword=function(){b.path("/changePassword")},g.cancel=function(){g.showProfile=!0,g.showEdit=!1},void(g.save=function(){a.updateProfile(g.user).then(function(a){"SUCCESS"===a.message?(g.cancel(),d(function(){g.showSuccess=!1},5e3)):(g.showError=!0,g.errMsg="Update Failed",d(function(){g.showError=!1},5e3))},function(a){g.showError=!0,g.errMsg=a,d(function(){g.showError=!1},5e3)})})):(g.showProfile=!1,g.showEdit=!1,g.showError=!0,void(g.errMsg="Sorry you do not have permission to edit this user!!!"))}]),angular.module("ipValuationApp").controller("UserlistCtrl",["userService",function(a){var b=this;b.userList=[],b.loading=!0,b.showList=!1,a.fetch().then(function(a){b.userList=a,console.log(a),b.userList?b.showList=!0:(b.showError=!0,b.errMsg="No user found!!")},function(){b.showError=!0,b.errMsg="Unable to get user information!!"})["finally"](function(){b.loading=!1})}]);