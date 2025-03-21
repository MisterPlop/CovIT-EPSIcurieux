const countries = [
  { name: "Afghanistan", population: 39785041 },
  { name: "Albania", population: 2874707 },
  { name: "Algeria", population: 44625798 },
  { name: "Andorra", population: 77386 },
  { name: "Angola", population: 33862788 },
  { name: "Anguilla", population: 15252 },
  { name: "Antigua And Barbuda", population: 99439 },
  { name: "Antigua and Barbuda", population: 98010 },
  { name: "Argentina", population: 45602529 },
  { name: "Armenia", population: 2968684 },
  { name: "Aruba", population: 107211 },
  { name: "Australia", population: 25789881 },
  { name: "Austria", population: 9056841 },
  { name: "Azerbaijan", population: 10228813 },
  { name: "Bahamas", population: 396929 },
  { name: "Bahrain", population: 1759164 },
  { name: "Bangladesh", population: 166298281 },
  { name: "Barbados", population: 287720 },
  { name: "Belarus", population: 9446268 },
  { name: "Belgium", population: 11639150 },
  { name: "Belize", population: 404690 },
  { name: "Benin", population: 12433158 },
  { name: "Bermuda", population: 62052 },
  { name: "Bhutan", population: 779937 },
  { name: "Bolivia", population: 11829006 },
  { name: "Bosnia And Herzegovina", population: 3242823 },
  { name: "Bosnia and Herzegovina", population: 3278650 },
  { name: "Botswana", population: 2398056 },
  { name: "Brazil", population: 214042097 },
  { name: "British Virgin Islands", population: 30606 },
  { name: "Brunei", population: 445281 },
  { name: "Brunei Darussalam", population: 445281 },
  { name: "Bulgaria", population: 6896957 },
  { name: "Burkina Faso", population: 21462574 },
  { name: "Burundi", population: 12236107 },
  { name: "Cabo Verde", population: 561907 },
  { name: "Cambodia", population: 16945621 },
  { name: "Cameroon", population: 27191120 },
  { name: "Canada", population: 38066743 },
  { name: "Caribbean Netherlands", population: 26462 },
  { name: "Cayman Islands", population: 66478 },
  { name: "Central African Republic", population: 4986136 },
  { name: "Chad", population: 16885612 },
  { name: "Channel Islands", population: 175435 },
  { name: "Chile", population: 19277163 },
  { name: "China", population: 1439323776 },
  { name: "China", population: 1439323776 },
  { name: "China Hong Kong Sar", population: 7610260 },
  { name: "China Macao Sar", population: 665819 },
  { name: "Colombia", population: 51414606 },
  { name: "Comoros", population: 887708 },
  { name: "Congo", population: 5650727 },
  { name: "Cook Islands", population: 17594 },
  { name: "Costa Rica", population: 5139741 },
  { name: "Cote D Ivoire", population: 27594347 },
  { name: "Croatia", population: 4080353 },
  { name: "Cuba", population: 11319820 },
  { name: "Curacao", population: 165343 },
  { name: "Cyprus", population: 1215983 },
  { name: "Czech Republic", population: 10728500 },
  { name: "Democratic Republic Of The Congo", population: 94629737 },
  { name: "Denmark", population: 5812234 },
  { name: "Djibouti", population: 1002071 },
  { name: "Dominica", population: 72161 },
  { name: "Dominican Republic", population: 10954579 },
  { name: "Ecuador", population: 17905393 },
  { name: "Egypt", population: 104222455 },
  { name: "El Salvador", population: 6518336 },
  { name: "Equatorial Guinea", population: 1447889 },
  { name: "Eritrea", population: 3594501 },
  { name: "Estonia", population: 1327411 },
  { name: "Ethiopia", population: 117744423 },
  { name: "Faeroe Islands", population: 49045 },
  { name: "Falkland Islands Malvinas", population: 3669 },
  { name: "Fiji", population: 902819 },
  { name: "Finland", population: 5549177 },
  { name: "France", population: 65415404 },
  { name: "French Guiana", population: 306239 },
  { name: "French Polynesia", population: 282502 },
  { name: "Gabon", population: 2277037 },
  { name: "Gambia", population: 2482904 },
  { name: "Georgia", population: 3981638 },
  { name: "Germany", population: 84047070 },
  { name: "Ghana", population: 31707050 },
  { name: "Gibraltar", population: 33681 },
  { name: "Greece", population: 10372964 },
  { name: "Greenland", population: 56866 },
  { name: "Grenada", population: 113035 },
  { name: "Guadeloupe", population: 400191 },
  { name: "Guatemala", population: 18239784 },
  { name: "Guinea", population: 13959842 },
  { name: "Guinea-Bissau", population: 2015994 },
  { name: "Guyana", population: 808726 },
  { name: "Haiti", population: 11577779 },
  { name: "Holy See", population: 801 },
  { name: "Honduras", population: 10274653 },
  { name: "Hungary", population: 9606258 },
  { name: "Iceland", population: 343599 },
  { name: "India", population: 1393409038 },
  { name: "Indonesia", population: 276361783 },
  { name: "Iran", population: 85028760 },
  { name: "Iraq", population: 42263664 },
  { name: "Ireland", population: 5020206 },
  { name: "Isle Of Man", population: 85407 },
  { name: "Israel", population: 9336300 },
  { name: "Italy", population: 60262770 },
  { name: "Ivory Coast", population: 27594347 },
  { name: "Jamaica", population: 2961161 },
  { name: "Japan", population: 125584838 },
  { name: "Jordan", population: 10399240 },
  { name: "Kazakhstan", population: 19221548 },
  { name: "Kenya", population: 54815200 },
  { name: "Kiribati", population: 123419 },
  { name: "Kosovo", population: 1831000 },
  { name: "Kuwait", population: 4394200 },
  { name: "Kyrgyzstan", population: 6673100 },
  { name: "Laos", population: 7370840 },
  { name: "Latvia", population: 1848837 },
  { name: "Lebanon", population: 5481847 },
  { name: "Lesotho", population: 2142249 },
  { name: "Liberia", population: 5301000 },
  { name: "Libya", population: 7035955 },
  { name: "Liechtenstein", population: 38749 },
  { name: "Lithuania", population: 2689863 },
  { name: "Luxembourg", population: 645397 },
  { name: "Macedonia", population: 2083459 },
  { name: "Madagascar", population: 29178000 },
  { name: "Malawi", population: 20080780 },
  { name: "Malaysia", population: 33181072 },
  { name: "Maldives", population: 521021 },
  { name: "Mali", population: 22310000 },
  { name: "Malta", population: 514564 },
  { name: "Marshall Islands", population: 42202 },
  { name: "Martinique", population: 364508 },
  { name: "Mauritania", population: 4862539 },
  { name: "Mauritius", population: 1271768 },
  { name: "Mayotte", population: 299348 },
  { name: "Mexico", population: 126705138 },
  { name: "Micronesia", population: 115021 },
  { name: "Moldova", population: 2617820 },
  { name: "Monaco", population: 39242 },
  { name: "Mongolia", population: 3382023 },
  { name: "Montenegro", population: 621718 },
  { name: "Montserrat", population: 4992 },
  { name: "Morocco", population: 37411000 },
  { name: "Mozambique", population: 33165561 },
  { name: "Myanmar", population: 54817919 },
  { name: "Namibia", population: 2587801 },
  { name: "Nauru", population: 10834 },
  { name: "Nepal", population: 30419992 },
  { name: "Netherlands", population: 17475447 },
  { name: "New Caledonia", population: 289358 },
  { name: "New Zealand", population: 5135300 },
  { name: "Nicaragua", population: 6965513 },
  { name: "Niger", population: 26278718 },
  { name: "Nigeria", population: 213401323 },
  { name: "Niue", population: 1618 },
  { name: "North Macedonia", population: 2083459 },
  { name: "Norway", population: 5421241 },
  { name: "Oman", population: 4540000 },
  { name: "Pakistan", population: 231402117 },
  { name: "Palau", population: 18092 },
  { name: "Panama", population: 4446350 },
  { name: "Papua New Guinea", population: 9297640 },
  { name: "Paraguay", population: 7352773 },
  { name: "Peru", population: 33684206 },
  { name: "Philippines", population: 113880328 },
  { name: "Poland", population: 37797100 },
  { name: "Portugal", population: 10191409 },
  { name: "Qatar", population: 2930527 },
  { name: "Republic of the Congo", population: 5650727 },
  { name: "Reunion", population: 974512 },
  { name: "Romania", population: 18907600 },
  { name: "Russia", population: 143185000 },
  { name: "Rwanda", population: 13792718 },
  { name: "Saint Barthelemy", population: 9877 },
  { name: "Saint Helena", population: 6071 },
  { name: "Saint Kitts And Nevis", population: 53192 },
  { name: "Saint Kitts and Nevis", population: 53192 },
  { name: "Saint Lucia", population: 185113 },
  { name: "Saint Martin", population: 38666 },
  { name: "Saint Pierre And Miquelon", population: 5794 },
  { name: "Saint Vincent And The Grenadines", population: 110589 },
  { name: "Saint Vincent and the Grenadines", population: 110589 },
  { name: "Samoa", population: 202506 },
  { name: "San Marino", population: 33600 },
  { name: "Sao Tome And Principe", population: 227380 },
  { name: "Sao Tome and Principe", population: 227380 },
  { name: "Saudi Arabia", population: 35900000 },
  { name: "Senegal", population: 17854323 },
  { name: "Serbia", population: 6908224 },
  { name: "Seychelles", population: 107118 },
  { name: "Sierra Leone", population: 8276115 },
  { name: "Singapore", population: 5703600 },
  { name: "Sint Maarten", population: 43876 },
  { name: "Slovakia", population: 5456362 },
  { name: "Slovenia", population: 2078654 },
  { name: "Solomon Islands", population: 739850 },
  { name: "Somalia", population: 18129529 },
  { name: "South Africa", population: 60142978 },
  { name: "South Korea", population: 51780579 },
  { name: "South Sudan", population: 11425392 },
  { name: "Spain", population: 47351567 },
  { name: "Sri Lanka", population: 21919000 },
  { name: "State Of Palestine", population: 5314300 },
  { name: "Sudan", population: 45890000 },
  { name: "Suriname", population: 618040 },
  { name: "Swaziland", population: 1160164 },
  { name: "Sweden", population: 10415811 },
  { name: "Switzerland", population: 8745800 },
  { name: "Syria", population: 18275700 },
  { name: "Taiwan", population: 23568378 },
  { name: "Tajikistan", population: 10014300 },
  { name: "Tanzania", population: 65296800 },
  { name: "Thailand", population: 69950800 },
  { name: "Timor Leste", population: 1387149 },
  { name: "Timor-Leste", population: 1387149 },
  { name: "Togo", population: 8538097 },
  { name: "Tonga", population: 105697 },
  { name: "Trinidad And Tobago", population: 1399491 },
  { name: "Trinidad and Tobago", population: 1399491 },
  { name: "Tunisia", population: 12601400 },
  { name: "Turkey", population: 86972400 },
  { name: "Turks And Caicos Islands", population: 43058 },
  { name: "Uganda", population: 45711874 },
  { name: "Ukraine", population: 36530000 },
  { name: "United Arab Emirates", population: 9890400 },
  { name: "United Kingdom", population: 67886004 },
  { name: "United States", population: 331893745 },
  { name: "Uruguay", population: 3494382 },
  { name: "Uzbekistan", population: 35108000 },
  { name: "Vanuatu", population: 319505 },
  { name: "Venezuela", population: 28435943 },
  { name: "Viet Nam", population: 98168829 },
  { name: "Vietnam", population: 98168829 },
  { name: "Wallis And Futuna Islands", population: 11700 },
  { name: "West Bank and Gaza", population: 5314300 },
  { name: "Western Sahara", population: 597339 },
  { name: "Yemen", population: 33696600 },
  { name: "Zambia", population: 19417300 },
  { name: "Zimbabwe", population: 15074826 }

  ];
  
  export default countries;
  