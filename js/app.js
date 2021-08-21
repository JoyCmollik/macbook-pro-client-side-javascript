////////////////////////////////////////////////////////////
////////// fetching elements for checkout section //////////
////////////////////////////////////////////////////////////

// buttons memory //
const memBtn8gb = document.getElementById('mem-8gb');
const memBtn16gb = document.getElementById('mem-16gb');
const memBtns = document.querySelector('.memory-btn-group').children;
// buttons storage //
const storageBtn256gb = document.getElementById('storage-256gb');
const storageBtn512gb = document.getElementById('storage-512gb');
const storageBtn1tb = document.getElementById('storage-1tb');
const storageBtns = document.querySelector('.storage-btn-group').children;
// buttons delivery //
const freeDeliveryBtn = document.getElementById('delivery-free');
const paidDeliveryBtn = document.getElementById('delivery-paid');
const deliveryBtns = document.querySelector('.delivery-btn-group').children;

// product pricing //
const bestPrice = document.querySelector('.best-price');
const exMemoryCost = document.querySelector('.ex-memory-cost');
const exStorageCost = document.querySelector('.ex-storage-cost');
const deliveryCost = document.querySelector('.delivery-cost');
const totalCost = document.querySelector('.total-cost');
// promo code //
const promoInput = document.getElementById('promo-input');
const promoBtn = document.getElementById('promo-btn');
const promoMsg = document.getElementById('promo-message');
// grand total //
const grandTotalPrice = document.getElementById('grand-total');

////////////////////////////////////////////////////
////////// functions for checkout section //////////
////////////////////////////////////////////////////

// function to update per specifications cost
function updateSpecCost(specPrevCost, specNewCost) {
	const specPrevCostValue = parseInt(specPrevCost.innerText);

	if (specPrevCostValue != specNewCost) {
		specPrevCost.innerText = specNewCost;
		updateTotalCost(specPrevCostValue, specNewCost);
	}
}

// function to update total cost after adding specifications
function updateTotalCost(prevCost, newCost) {
	let totalCostValue = parseInt(totalCost.innerText);

	// total cost calculations
	totalCostValue -= prevCost;
	totalCostValue += newCost;

	// update total cost and grand total cost
	totalCost.innerText = totalCostValue;
	grandTotalPrice.innerText = totalCostValue;
}

// function to make any item selected
function makeSelectedItem(selectedItem, selectedItemGroup) {
	const selectedClass = 'btn-dark';
	const unselectedClass = 'btn-outline-dark';

	for (item of selectedItemGroup) {
		if (item.classList.contains(selectedClass)) {
			item.classList.remove(selectedClass);
			item.classList.add(unselectedClass);
		}
	}

	selectedItem.classList.add(selectedClass);
	selectedItem.classList.remove(unselectedClass);
}

// function to verify user's promo code input
function isValidPromoCode() {
	if (promoInput.value == 'stevekaku') {
		const updatedGrandTotal = parseFloat(grandTotalPrice.innerText) * 0.8;
		grandTotalPrice.innerText = updatedGrandTotal;
		return true;
	}
	return false;
}

// function to show message as per user's promo code validation
function showMessage(isApplied) {
	if (isApplied) {
		promoMsg.classList.remove('alert-danger');
		promoMsg.classList.add('alert-success');
		promoMsg.innerText = 'Promo code applied successfully';
	} else {
		promoMsg.classList.remove('alert-success');
		promoMsg.classList.add('alert-danger');

		if (promoInput.value == '') {
			promoMsg.innerText = 'Input field is empty';
		} else {
			promoMsg.innerText = 'Promo code is not valid';
		}
	}
}

//////////////////////////////////////////////////////////
////////// event listeners for checkout section //////////
//////////////////////////////////////////////////////////

// memory buttons event listeners
memBtn8gb.addEventListener('click', function () {
	updateSpecCost(exMemoryCost, 0);
	makeSelectedItem(memBtn8gb, memBtns);
});

memBtn16gb.addEventListener('click', function () {
	updateSpecCost(exMemoryCost, 180);
	makeSelectedItem(memBtn16gb, memBtns);
});

// storage buttons event listeners
storageBtn256gb.addEventListener('click', function () {
	updateSpecCost(exStorageCost, 0);
	makeSelectedItem(storageBtn256gb, storageBtns);
});

storageBtn512gb.addEventListener('click', function () {
	updateSpecCost(exStorageCost, 100);
	makeSelectedItem(storageBtn512gb, storageBtns);
});

storageBtn1tb.addEventListener('click', function () {
	updateSpecCost(exStorageCost, 180);
	makeSelectedItem(storageBtn1tb, storageBtns);
});

// delivery buttons event listeners
freeDeliveryBtn.addEventListener('click', function () {
	updateSpecCost(deliveryCost, 0);
	makeSelectedItem(freeDeliveryBtn, deliveryBtns);
});

paidDeliveryBtn.addEventListener('click', function () {
	updateSpecCost(deliveryCost, 20);
	makeSelectedItem(paidDeliveryBtn, deliveryBtns);
});

// promo code event listeners
promoBtn.addEventListener('click', function () {
	if (isValidPromoCode()) {
		// disable apply button and input field
		promoBtn.setAttribute('disabled', true);
		promoInput.setAttribute('disabled', true);
		// show success message
		showMessage(true);
	} else {
		// show failure message
		showMessage(false);
	}

	// clear inputs
	promoInput.value = '';
});
