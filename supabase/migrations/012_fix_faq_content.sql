-- Fix FAQ content to match actual business model (live workshops, not unlimited access)

UPDATE landing_faq SET answer = 'Blueberry Academy არის ონლაინ სასწავლო პლატფორმა, სადაც კურსები ტარდება ლაივ ვორკშოპების ფორმატით Google Meet-ზე. შეიძინე კურსი, ესწარი სესიებს ინდუსტრიის ექსპერტებთან ერთად და დასაქმდი. ტექნოლოგიური პარტნიორი — Blueberry Systems.' WHERE sort_order = 1;

UPDATE landing_faq SET answer = 'შეარჩიე კურსი, გადაიხადე ერთჯერადი თანხა და მიიღე წვდომა ყველა ლაივ ვორკშოპზე. კურსის მიხედვით 5-8 სესია Google Meet-ზე.' WHERE sort_order = 2;

UPDATE landing_faq SET question = 'როგორ მიმდინარეობს სწავლა?', answer = 'კურსი მოიცავს ლაივ ვორკშოპებს Google Meet-ზე განრიგის მიხედვით. ყოველი სესია ინტერაქტიულია — ინსტრუქტორთან პირდაპირი კომუნიკაცია, პრაქტიკული დავალებები და Q&A.' WHERE sort_order = 3;

UPDATE landing_faq SET answer = '7-დღიანი თანხის დაბრუნების გარანტია პირველ სესიამდე. თუ პირველი ვორკშოპის შემდეგ გადაიფიქრებ, სრულ თანხას დაგიბრუნებთ.' WHERE sort_order = 4;

UPDATE landing_faq SET answer = 'ყველა ვორკშოპის წარმატებით გავლის შემდეგ მიიღებ ვერიფიცირებულ სერტიფიკატს, რომელიც გააზიარე LinkedIn-ზე ან დაამატე რეზიუმეში.' WHERE sort_order = 5;
