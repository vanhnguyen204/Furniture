class Address {
  _id: string;
  country: string;
  city: string;
  district: string;
  addressDetail: string;
  recipient: string;
  isSelected: boolean;

  constructor(
    country: string,
    city: string,
    district: string,
    addressDetail: string,
    recipient: string,
    isSelected: boolean,
    _id: string,
  ) {
    this.recipient = recipient;
    this.country = country;
    this.city = city;
    this.addressDetail = addressDetail;
    this.district = district;
    this.isSelected = isSelected;
    this._id = _id;
  }
}

export default Address;
