const puppeteer = require('puppeteer');

let user = {
	employeeId: "204",
	designation: "Engineer",
	department: "Technical",
	appraiserName: "Abhinandan Shah",
	jobKnowledge: 4,
	workQuality: 4,
	initiative: 4,
	attendance: 4,
	communication: 4,
	dependability: 4,
};

let citeReasons = [
	'Improving my efficiency with time as well as trying to help all co workers as much as possible.',
	'Getting better with time.'
];

(() => {
	let myDate = new Date();
	let from;
	from = ('01' + ('0' + (myDate.getMonth()+1)).slice(-2) + myDate.getFullYear());
	user.reviewPeriodFrom = from;
	let to;
	to = ((new Date(myDate.getFullYear(), myDate.getMonth() + 1, 0).getDate()) + ('0' + (myDate.getMonth()+1)).slice(-2) + myDate.getFullYear());
	user.reviewPeriodTo = to;
	console.log("from",  from);
	console.log("to",  to);
})();



(async () => {
    const browser = await puppeteer.launch({ 
    	userDataDir: './user_data', 
    	headless: false
    });
    const page = await browser.newPage();
    page.on('console', (log) => console[log._type](log._text));
    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSd02O-4rOCd0KgOIDLEUub3VS4TIinzE5HtNag36dRk7gyQ4w/viewform?c=0&w=1', { waitUntil: 'networkidle0' });
    console.log("Running..");
    
    await page.type('input[aria-label="Employee ID"]', user.employeeId);
    await page.type('input[aria-label="Designation"]', user.designation);
    await page.click(`div[data-value="${user.department}"]`);
    await page.type('input[aria-label="Appraiser&#39;s Name"]', user.appraiserName);
    await page.type('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(6) > div > div.freebirdFormviewerViewItemsDateInputsContainer > div > div.quantumWizTextinputPaperinputEl.freebirdThemedInput.freebirdFormviewerViewItemsDateDateInput.modeLight > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input', user.reviewPeriodFrom);
    await page.type('#mG61Hd > div > div.freebirdFormviewerViewFormContent > div.freebirdFormviewerViewItemList > div:nth-child(7) > div > div.freebirdFormviewerViewItemsDateInputsContainer > div > div.quantumWizTextinputPaperinputEl.freebirdThemedInput.freebirdFormviewerViewItemsDateDateInput.modeLight > div.quantumWizTextinputPaperinputMainContent.exportContent > div > div.quantumWizTextinputPaperinputInputArea > input', user.reviewPeriodTo);

    await page.click(`.freebirdFormviewerViewNumberedItemContainer:nth-child(9) > div > div:nth-child(2) > div > content > div > div:nth-child(${user.jobKnowledge})`);
    await page.click(`.freebirdFormviewerViewNumberedItemContainer:nth-child(10) > div > div:nth-child(2) > div > content > div > div:nth-child(${user.workQuality})`);
    await page.click(`.freebirdFormviewerViewNumberedItemContainer:nth-child(11) > div > div:nth-child(2) > div > content > div > div:nth-child(${user.initiative})`);
    await page.click(`.freebirdFormviewerViewNumberedItemContainer:nth-child(12) > div > div:nth-child(2) > div > content > div > div:nth-child(${user.attendance})`);
    await page.click(`.freebirdFormviewerViewNumberedItemContainer:nth-child(13) > div > div:nth-child(2) > div > content > div > div:nth-child(${user.communication})`);
    await page.click(`.freebirdFormviewerViewNumberedItemContainer:nth-child(14) > div > div:nth-child(2) > div > content > div > div:nth-child(${user.dependability})`);

    await page.type('textarea[aria-label="Cite examples supporting above ratings"]', citeReasons[Math.floor(Math.random() * citeReasons.length)] )

    await page.click('div[aria-label="Send me a copy of my responses."]');

    await Promise.all([
    	page.waitForNavigation(),
		await page.click('.freebirdFormviewerViewNavigationButtons')
    ]);

	await page.click('.freebirdFormviewerViewNotificationsResubmitButton')

    await browser.close();
})();