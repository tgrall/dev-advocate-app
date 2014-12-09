db.activity_types.remove({});

db.activity_types.save([
  { "_id" : "CONF", "label" : "Conference", "category" : "Market" , "type" : "Community"  },
  { "_id" : "JUG", "label" : "Java User Group", "category" : "Market" , "type" : "Community"  },
  { "_id" : "MUG", "label" : "MongoDB User Group", "category" : "Market" , "type" : "Community"  },
  { "_id" : "MTUP", "label" : "Meetup", "category" : "Market" , "type" : "Community"  },
  { "_id" : "WBR", "label" : "Webinar", "category" : "Market" , "type" : "Marketing" },
  { "_id" : "MKT_EVT", "label" : "Marketing Event", "category" : "Market" , "type" : "Marketing" },
  { "_id" : "CERT", "label" : "Certification", "category" : "Create" , "type" : "Partner"  },
  { "_id" : "PTEVT", "label" : "Partner Event", "category" : "Market" , "type" : "Partner"  },
  { "_id" : "BCP", "label" : "Bootcamp", "category" : "Enable" , "type" : "Partner" },
  { "_id" : "PTENBL", "label" : "Partner Enablement Meeting", "category" : "Enable" , "type" : "Partner"  },
  { "_id" : "PTSALES", "label" : "Partner Sales Meeting", "category" : "Sales" , "type" : "Partner"  },
  { "_id" : "SALES", "label" : "Customer Sales Meeting", "category" : "Sales" , "type" : "Sales"  },
  { "_id" : "WSHP", "label" : "Workshop", "category" : "Enable" , "type" : "Community"  },
  { "_id" : "PTWSHP", "label" : "Partner Workshop", "category" : "Enable" , "type" : "Partner"  }
  ]
  , {"ordered" : false});



db.conferences.ensureIndex(
  { "name" : "text" , "informations" : "text" },
  {
    "weights" : { "name" : 10 ,  "informations" : 5 } ,
    "name" : "TextIndex"
  }
);

db.papers.ensureIndex(
  { "title" : "text" , "description" : "text" },
  {
    "weights" : { "title" : 10 ,  "description" : 5 } ,
    "name" : "TextIndex"
  }
);


db.link_types.insert([
  {"_id":"Slideshare","label":"Slideshare"}
 ,{"_id":"Speakerdeck","label":"Speakerdeck"}
 ,{"_id":"Video","label":"Video"}
 ,{"_id":"Code","label":"Code"}
 ,{"_id":"File","label":"File"}
 ,{"_id":"Others","label":"Others"}
  ]
  , {"ordered" : false});


db.technologies.insert([
   {"_id":".NET","label":".NET", "category" : "Languages"}
  ,{"_id":".C","label":".C", "category" : "Languages"}
  ,{"_id":"Clojure","label":"Clojure", "category" : "Languages"}
  ,{"_id":"Go","label":"Go", "category" : "Languages"}
  ,{"_id":"Java","label":"Java", "category" : "Languages"}
  ,{"_id":"Javascript","label":"Javascript", "category" : "Languages"}
  ,{"_id":"PHP","label":"PHP", "category" : "Languages"}
  ,{"_id":"Python","label":"Python", "category" : "Languages"}
  ,{"_id":"Rails","label":"Rails", "category" : "Languages"}
  ,{"_id":"Ruby","label":"Ruby", "category" : "Languages"}
  ,{"_id":"Scala","label":"Scala", "category" : "Languages"}
  ,{"_id":"Docker","label":"Docker", "category" : "Ops"}
  ,{"_id":"Hadoop","label":"Hadoop", "category" : "Architecture"}
  ]
  , {"ordered" : false});


db.topics.insert([
  {"_id":"Cloud","label":"Cloud", "category" : "DevOps"}
  ,{"_id":"DevOps","label":"DevOps", "category" : "DevOps"}
  ,{"_id":"Mobile","label":"Mobile", "category" : "Architecture"}
  ,{"_id":"Web","label":"Web", "category" : "Architecture"}
  ,{"_id":"NoSQL","label":"NoSQL", "category" : "Architecture"}
  ,{"_id":"Big Data","label":"Big Data", "category" : "Architecture"}
  ,{"_id":"Security","label":"Security", "category" : "Architecture"}
  ,{"_id":"Startup","label":"Startup", "category" : "Business"}
  ,{"_id":"Methodology","label":"Methodology", "category" : "Business"}
  ,{"_id":"Future","label":"Future", "category" : "Business"}
  ,{"_id":"Games","label":"Games", "category" : "Business"}
  ]
  , {"ordered" : false});


db.countries.insert([
  {"name": 'Afghanistan', "_id": 'AF'},
  {"name": 'Åland Islands', "_id": 'AX'},
  {"name": 'Albania', "_id": 'AL'},
  {"name": 'Algeria', "_id": 'DZ'},
  {"name": 'American Samoa', "_id": 'AS'},
  {"name": 'AndorrA', "_id": 'AD'},
  {"name": 'Angola', "_id": 'AO'},
  {"name": 'Anguilla', "_id": 'AI'},
  {"name": 'Antarctica', "_id": 'AQ'},
  {"name": 'Antigua and Barbuda', "_id": 'AG'},
  {"name": 'Argentina', "_id": 'AR'},
  {"name": 'Armenia', "_id": 'AM'},
  {"name": 'Aruba', "_id": 'AW'},
  {"name": 'Australia', "_id": 'AU'},
  {"name": 'Austria', "_id": 'AT'},
  {"name": 'Azerbaijan', "_id": 'AZ'},
  {"name": 'Bahamas', "_id": 'BS'},
  {"name": 'Bahrain', "_id": 'BH'},
  {"name": 'Bangladesh', "_id": 'BD'},
  {"name": 'Barbados', "_id": 'BB'},
  {"name": 'Belarus', "_id": 'BY'},
  {"name": 'Belgium', "_id": 'BE'},
  {"name": 'Belize', "_id": 'BZ'},
  {"name": 'Benin', "_id": 'BJ'},
  {"name": 'Bermuda', "_id": 'BM'},
  {"name": 'Bhutan', "_id": 'BT'},
  {"name": 'Bolivia', "_id": 'BO'},
  {"name": 'Bosnia and Herzegovina', "_id": 'BA'},
  {"name": 'Botswana', "_id": 'BW'},
  {"name": 'Bouvet Island', "_id": 'BV'},
  {"name": 'Brazil', "_id": 'BR'},
  {"name": 'British Indian Ocean Territory', "_id": 'IO'},
  {"name": 'Brunei Darussalam', "_id": 'BN'},
  {"name": 'Bulgaria', "_id": 'BG'},
  {"name": 'Burkina Faso', "_id": 'BF'},
  {"name": 'Burundi', "_id": 'BI'},
  {"name": 'Cambodia', "_id": 'KH'},
  {"name": 'Cameroon', "_id": 'CM'},
  {"name": 'Canada', "_id": 'CA'},
  {"name": 'Cape Verde', "_id": 'CV'},
  {"name": 'Cayman Islands', "_id": 'KY'},
  {"name": 'Central African Republic', "_id": 'CF'},
  {"name": 'Chad', "_id": 'TD'},
  {"name": 'Chile', "_id": 'CL'},
  {"name": 'China', "_id": 'CN'},
  {"name": 'Christmas Island', "_id": 'CX'},
  {"name": 'Cocos (Keeling) Islands', "_id": 'CC'},
  {"name": 'Colombia', "_id": 'CO'},
  {"name": 'Comoros', "_id": 'KM'},
  {"name": 'Congo', "_id": 'CG'},
  {"name": 'Congo, The Democratic Republic of the', "_id": 'CD'},
  {"name": 'Cook Islands', "_id": 'CK'},
  {"name": 'Costa Rica', "_id": 'CR'},
  {"name": 'Cote D\'Ivoire', "_id": 'CI'},
  {"name": 'Croatia', "_id": 'HR'},
  {"name": 'Cuba', "_id": 'CU'},
  {"name": 'Cyprus', "_id": 'CY'},
  {"name": 'Czech Republic', "_id": 'CZ'},
  {"name": 'Denmark', "_id": 'DK'},
  {"name": 'Djibouti', "_id": 'DJ'},
  {"name": 'Dominica', "_id": 'DM'},
  {"name": 'Dominican Republic', "_id": 'DO'},
  {"name": 'Ecuador', "_id": 'EC'},
  {"name": 'Egypt', "_id": 'EG'},
  {"name": 'El Salvador', "_id": 'SV'},
  {"name": 'Equatorial Guinea', "_id": 'GQ'},
  {"name": 'Eritrea', "_id": 'ER'},
  {"name": 'Estonia', "_id": 'EE'},
  {"name": 'Ethiopia', "_id": 'ET'},
  {"name": 'Falkland Islands (Malvinas)', "_id": 'FK'},
  {"name": 'Faroe Islands', "_id": 'FO'},
  {"name": 'Fiji', "_id": 'FJ'},
  {"name": 'Finland', "_id": 'FI'},
  {"name": 'France', "_id": 'FR'},
  {"name": 'French Guiana', "_id": 'GF'},
  {"name": 'French Polynesia', "_id": 'PF'},
  {"name": 'French Southern Territories', "_id": 'TF'},
  {"name": 'Gabon', "_id": 'GA'},
  {"name": 'Gambia', "_id": 'GM'},
  {"name": 'Georgia', "_id": 'GE'},
  {"name": 'Germany', "_id": 'DE'},
  {"name": 'Ghana', "_id": 'GH'},
  {"name": 'Gibraltar', "_id": 'GI'},
  {"name": 'Greece', "_id": 'GR'},
  {"name": 'Greenland', "_id": 'GL'},
  {"name": 'Grenada', "_id": 'GD'},
  {"name": 'Guadeloupe', "_id": 'GP'},
  {"name": 'Guam', "_id": 'GU'},
  {"name": 'Guatemala', "_id": 'GT'},
  {"name": 'Guernsey', "_id": 'GG'},
  {"name": 'Guinea', "_id": 'GN'},
  {"name": 'Guinea-Bissau', "_id": 'GW'},
  {"name": 'Guyana', "_id": 'GY'},
  {"name": 'Haiti', "_id": 'HT'},
  {"name": 'Heard Island and Mcdonald Islands', "_id": 'HM'},
  {"name": 'Holy See (Vatican City State)', "_id": 'VA'},
  {"name": 'Honduras', "_id": 'HN'},
  {"name": 'Hong Kong', "_id": 'HK'},
  {"name": 'Hungary', "_id": 'HU'},
  {"name": 'Iceland', "_id": 'IS'},
  {"name": 'India', "_id": 'IN'},
  {"name": 'Indonesia', "_id": 'ID'},
  {"name": 'Iran, Islamic Republic Of', "_id": 'IR'},
  {"name": 'Iraq', "_id": 'IQ'},
  {"name": 'Ireland', "_id": 'IE'},
  {"name": 'Isle of Man', "_id": 'IM'},
  {"name": 'Israel', "_id": 'IL'},
  {"name": 'Italy', "_id": 'IT'},
  {"name": 'Jamaica', "_id": 'JM'},
  {"name": 'Japan', "_id": 'JP'},
  {"name": 'Jersey', "_id": 'JE'},
  {"name": 'Jordan', "_id": 'JO'},
  {"name": 'Kazakhstan', "_id": 'KZ'},
  {"name": 'Kenya', "_id": 'KE'},
  {"name": 'Kiribati', "_id": 'KI'},
  {"name": 'Korea, Democratic People\'S Republic of', "_id": 'KP'},
  {"name": 'Korea, Republic of', "_id": 'KR'},
  {"name": 'Kuwait', "_id": 'KW'},
  {"name": 'Kyrgyzstan', "_id": 'KG'},
  {"name": 'Lao People\'S Democratic Republic', "_id": 'LA'},
  {"name": 'Latvia', "_id": 'LV'},
  {"name": 'Lebanon', "_id": 'LB'},
  {"name": 'Lesotho', "_id": 'LS'},
  {"name": 'Liberia', "_id": 'LR'},
  {"name": 'Libyan Arab Jamahiriya', "_id": 'LY'},
  {"name": 'Liechtenstein', "_id": 'LI'},
  {"name": 'Lithuania', "_id": 'LT'},
  {"name": 'Luxembourg', "_id": 'LU'},
  {"name": 'Macao', "_id": 'MO'},
  {"name": 'Macedonia, The Former Yugoslav Republic of', "_id": 'MK'},
  {"name": 'Madagascar', "_id": 'MG'},
  {"name": 'Malawi', "_id": 'MW'},
  {"name": 'Malaysia', "_id": 'MY'},
  {"name": 'Maldives', "_id": 'MV'},
  {"name": 'Mali', "_id": 'ML'},
  {"name": 'Malta', "_id": 'MT'},
  {"name": 'Marshall Islands', "_id": 'MH'},
  {"name": 'Martinique', "_id": 'MQ'},
  {"name": 'Mauritania', "_id": 'MR'},
  {"name": 'Mauritius', "_id": 'MU'},
  {"name": 'Mayotte', "_id": 'YT'},
  {"name": 'Mexico', "_id": 'MX'},
  {"name": 'Micronesia, Federated States of', "_id": 'FM'},
  {"name": 'Moldova, Republic of', "_id": 'MD'},
  {"name": 'Monaco', "_id": 'MC'},
  {"name": 'Mongolia', "_id": 'MN'},
  {"name": 'Montserrat', "_id": 'MS'},
  {"name": 'Morocco', "_id": 'MA'},
  {"name": 'Mozambique', "_id": 'MZ'},
  {"name": 'Myanmar', "_id": 'MM'},
  {"name": 'Namibia', "_id": 'NA'},
  {"name": 'Nauru', "_id": 'NR'},
  {"name": 'Nepal', "_id": 'NP'},
  {"name": 'Netherlands', "_id": 'NL'},
  {"name": 'Netherlands Antilles', "_id": 'AN'},
  {"name": 'New Caledonia', "_id": 'NC'},
  {"name": 'New Zealand', "_id": 'NZ'},
  {"name": 'Nicaragua', "_id": 'NI'},
  {"name": 'Niger', "_id": 'NE'},
  {"name": 'Nigeria', "_id": 'NG'},
  {"name": 'Niue', "_id": 'NU'},
  {"name": 'Norfolk Island', "_id": 'NF'},
  {"name": 'Northern Mariana Islands', "_id": 'MP'},
  {"name": 'Norway', "_id": 'NO'},
  {"name": 'Oman', "_id": 'OM'},
  {"name": 'Pakistan', "_id": 'PK'},
  {"name": 'Palau', "_id": 'PW'},
  {"name": 'Palestinian Territory, Occupied', "_id": 'PS'},
  {"name": 'Panama', "_id": 'PA'},
  {"name": 'Papua New Guinea', "_id": 'PG'},
  {"name": 'Paraguay', "_id": 'PY'},
  {"name": 'Peru', "_id": 'PE'},
  {"name": 'Philippines', "_id": 'PH'},
  {"name": 'Pitcairn', "_id": 'PN'},
  {"name": 'Poland', "_id": 'PL'},
  {"name": 'Portugal', "_id": 'PT'},
  {"name": 'Puerto Rico', "_id": 'PR'},
  {"name": 'Qatar', "_id": 'QA'},
  {"name": 'Reunion', "_id": 'RE'},
  {"name": 'Romania', "_id": 'RO'},
  {"name": 'Russian Federation', "_id": 'RU'},
  {"name": 'RWANDA', "_id": 'RW'},
  {"name": 'Saint Helena', "_id": 'SH'},
  {"name": 'Saint Kitts and Nevis', "_id": 'KN'},
  {"name": 'Saint Lucia', "_id": 'LC'},
  {"name": 'Saint Pierre and Miquelon', "_id": 'PM'},
  {"name": 'Saint Vincent and the Grenadines', "_id": 'VC'},
  {"name": 'Samoa', "_id": 'WS'},
  {"name": 'San Marino', "_id": 'SM'},
  {"name": 'Sao Tome and Principe', "_id": 'ST'},
  {"name": 'Saudi Arabia', "_id": 'SA'},
  {"name": 'Senegal', "_id": 'SN'},
  {"name": 'Serbia and Montenegro', "_id": 'CS'},
  {"name": 'Seychelles', "_id": 'SC'},
  {"name": 'Sierra Leone', "_id": 'SL'},
  {"name": 'Singapore', "_id": 'SG'},
  {"name": 'Slovakia', "_id": 'SK'},
  {"name": 'Slovenia', "_id": 'SI'},
  {"name": 'Solomon Islands', "_id": 'SB'},
  {"name": 'Somalia', "_id": 'SO'},
  {"name": 'South Africa', "_id": 'ZA'},
  {"name": 'South Georgia and the South Sandwich Islands', "_id": 'GS'},
  {"name": 'Spain', "_id": 'ES'},
  {"name": 'Sri Lanka', "_id": 'LK'},
  {"name": 'Sudan', "_id": 'SD'},
  {"name": 'Suriname', "_id": 'SR'},
  {"name": 'Svalbard and Jan Mayen', "_id": 'SJ'},
  {"name": 'Swaziland', "_id": 'SZ'},
  {"name": 'Sweden', "_id": 'SE'},
  {"name": 'Switzerland', "_id": 'CH'},
  {"name": 'Syrian Arab Republic', "_id": 'SY'},
  {"name": 'Taiwan, Province of China', "_id": 'TW'},
  {"name": 'Tajikistan', "_id": 'TJ'},
  {"name": 'Tanzania, United Republic of', "_id": 'TZ'},
  {"name": 'Thailand', "_id": 'TH'},
  {"name": 'Timor-Leste', "_id": 'TL'},
  {"name": 'Togo', "_id": 'TG'},
  {"name": 'Tokelau', "_id": 'TK'},
  {"name": 'Tonga', "_id": 'TO'},
  {"name": 'Trinidad and Tobago', "_id": 'TT'},
  {"name": 'Tunisia', "_id": 'TN'},
  {"name": 'Turkey', "_id": 'TR'},
  {"name": 'Turkmenistan', "_id": 'TM'},
  {"name": 'Turks and Caicos Islands', "_id": 'TC'},
  {"name": 'Tuvalu', "_id": 'TV'},
  {"name": 'Uganda', "_id": 'UG'},
  {"name": 'Ukraine', "_id": 'UA'},
  {"name": 'United Arab Emirates', "_id": 'AE'},
  {"name": 'United Kingdom', "_id": 'GB'},
  {"name": 'United States', "_id": 'US'},
  {"name": 'United States Minor Outlying Islands', "_id": 'UM'},
  {"name": 'Uruguay', "_id": 'UY'},
  {"name": 'Uzbekistan', "_id": 'UZ'},
  {"name": 'Vanuatu', "_id": 'VU'},
  {"name": 'Venezuela', "_id": 'VE'},
  {"name": 'Viet Nam', "_id": 'VN'},
  {"name": 'Virgin Islands, British', "_id": 'VG'},
  {"name": 'Virgin Islands, U.S.', "_id": 'VI'},
  {"name": 'Wallis and Futuna', "_id": 'WF'},
  {"name": 'Western Sahara', "_id": 'EH'},
  {"name": 'Yemen', "_id": 'YE'},
  {"name": 'Zambia', "_id": 'ZM'},
  {"name": 'Zimbabwe', "_id": 'ZW'}
  ]
  , {"ordered" : false});
