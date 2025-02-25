function rentContainers(neededContainer, listings) {
  if (neededContainer <= 0) {
    return 'Number of containers needed must be greater than 0';
  }

  if (!Array.isArray(listings) || listings.length === 0) {
    return 'No listings found';
  }

  const validListings = listings.filter(
    (listing) => listing.totalCost > 0 && listing.container > 0,
  );

  if (validListings.length === 0) {
    return 'No valid listings available';
  }

  const sortedListings = [...validListings].sort(
    (a, b) => a.totalCost / a.container - b.totalCost / b.container,
  );

  const contracts = [];
  let totalRentedContainers = 0;
  let totalRentCost = 0;

  for (const listing of sortedListings) {
    if (totalRentedContainers >= neededContainer) {
      break;
    }
    const containersToRent = Math.min(
      listing.container,
      neededContainer - totalRentedContainers,
    );
    const rentCost = (containersToRent / listing.container) * listing.totalCost;
    totalRentedContainers += containersToRent;
    totalRentCost += rentCost;
    contracts.push(
      `[Contract with] ${listing.name} ${containersToRent} container, price: ${rentCost}`,
    );
  }
  if (totalRentedContainers < neededContainer) {
    contracts.push('Not enough containers');
  }
  contracts.push(`[Summary] total cost ${totalRentCost}`);

  return contracts;
}

module.exports = rentContainers;
