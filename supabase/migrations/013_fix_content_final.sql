-- Fix FAQ: correct brand name, remove money-back, natural Georgian
UPDATE landing_faq SET
  question = 'რა არის Blueberry Academy?',
  answer = 'Blueberry Academy არის პროფესიონალური სასწავლებელი, სადაც კურსები ტარდება ლაივ ვორკშოპების ფორმატით Google Meet-ზე. ინსტრუქტორები არიან წამყვანი პროფესიონალები, მათ შორის Blueberry Systems-ის სპეციალისტები.'
WHERE sort_order = 1;

UPDATE landing_faq SET
  answer = 'აირჩევ კურსს, იხდი ერთჯერად თანხას და იწყებ ლაივ ვორკშოპებზე დასწრებას. კურსის მიხედვით 5-დან 8-მდე სესიაა.'
WHERE sort_order = 2;

UPDATE landing_faq SET
  question = 'როგორ მიმდინარეობს სწავლა?',
  answer = 'ყოველი სესია ტარდება ლაივ Google Meet-ზე, განრიგის მიხედვით. ინსტრუქტორთან პირდაპირი კომუნიკაცია, პრაქტიკული დავალებები, კითხვა-პასუხი.'
WHERE sort_order = 3;

UPDATE landing_faq SET
  question = 'ვინ ასწავლის?',
  answer = 'ინსტრუქტორები არიან მოქმედი პროფესიონალები ინდუსტრიიდან. Blueberry Systems-ის სპეციალისტებიც აქტიურად მონაწილეობენ სწავლებაში.'
WHERE sort_order = 4;

UPDATE landing_faq SET
  answer = 'კურსის წარმატებით დასრულების შემდეგ მიიღებ ვერიფიცირებულ სერტიფიკატს. შეგიძლია დაამატო LinkedIn-ში ან CV-ში.'
WHERE sort_order = 5;

-- Stats: match About page exactly
UPDATE landing_stats SET value = 500, suffix = '+', label = 'კურსდამთავრებული' WHERE sort_order = 1;
UPDATE landing_stats SET value = 98, suffix = '%', label = 'დასაქმდა' WHERE sort_order = 2;
UPDATE landing_stats SET value = 50, suffix = '+', label = 'კურსი' WHERE sort_order = 3;
UPDATE landing_stats SET value = 30, suffix = '+', label = 'ინსტრუქტორი' WHERE sort_order = 4;
