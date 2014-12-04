var activity_types = [
 {  "_id" : "BCP" , "label":"Bootcamp", "category":"Enable"   },
 {  "_id" : "CERT" , "label":"Certification", "category":"Create"   },
 {  "_id" : "WBR" , "label":"Webinar", "category":"Market"   },
 {  "_id" : "PTEVT" , "label":"Partner Event", "category":"Market"   },
 {  "_id" : "CONF" , "label":"Conference", "category":"Market"   }
]


db.activity_types.insert(
  {  "_id" : "BCP" , "label":"Bootcamp", "category":"Enable"   }
);
db.activity_types.insert(
  {  "_id" : "CERT" , "label":"Certification", "category":"Create"   }
);

db.activity_types.insert(
  {  "_id" : "WBR" , "label":"Webinar", "category":"Market"   }
);

db.activity_types.insert(
{  "_id" : "PTEVT" , "label":"Partner Event", "category":"Market"   }
);

db.activity_types.insert(
{  "_id" : "CONF" , "label":"Conference", "category":"Market"   }
);
