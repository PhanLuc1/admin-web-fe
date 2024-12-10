/**
 * Parse Link Header từ API JHipster
 * @param {string} linkHeader - Header chứa các liên kết pagination
 * @returns {Object} - Object chứa các link như { next: URL, last: URL, first: URL }
 */
const parsePaginationLinks = (linkHeader) => {
    if (!linkHeader) return {};
    return linkHeader.split(",").reduce((acc, link) => {
        const match = link.match(/<(.*)>; rel="(\w+)"/);
        if (match) {
            acc[match[2]] = match[1]; // match[1]: URL, match[2]: loại link (rel)
        }
        return acc;
    }, {});
};

export default parsePaginationLinks;
