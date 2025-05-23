import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Image from "next/image";
import { Typography } from "@mui/material";
import { customFormatDate, getLocalStorage } from "@/services/common";
import { getBuyer } from "@/services/buyer";
import { getSeller } from "@/services/seller";


interface ContractPreviewProps {
    isOpen: boolean;
    heading: string;
    contentData?: any;
    onClick?: (val: boolean) => void,
}

const Index: React.FC<ContractPreviewProps> = ({ isOpen, heading, contentData, onClick }) => {

    const [open, setOpen] = React.useState(false);
    const [buyerData, setBuyerData] = React.useState<any>();
    const [sellerData, setSellerData] = React.useState<any>();
    const [logo, setLogo] = React.useState<string | null>('');

    useEffect(() => {

        const fetchBuyerData = async () => {
            const resp: any = await getBuyer(contentData.selectedBuyer._id as string);
            setBuyerData(resp.data);
        };

        const fetchSellerData = async () => {
            const resp: any = await getSeller(contentData.selectedSeller._id as string);
            setSellerData(resp.data);
        };

        if (contentData) {
            if (contentData.selectedBuyer !== null && contentData.selectedBuyer !== undefined) {
                fetchBuyerData();
                fetchSellerData();
            }
        }

        if (getLocalStorage('appLogo')) {
            setLogo(getLocalStorage('appLogo'))
        }

        setOpen(isOpen);
    }, [isOpen, logo]);


    const handleClose = () => {
        if (onClick) {
            onClick(false);
        }
        setOpen(false);
    };


    return (        
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="preview-dialogue"
            >
                {false && <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>}

                {contentData &&
                    <DialogContent>

                        <div className="preview-wrapper">
                            <div className="header">
                                {(logo && logo === 'logo') && <Image src={require(`../../public/images/${logo}.svg`)} alt="Description of the image" className="responsive-img center" />}
                                {(logo && logo !== 'logo') && <Image src={require(`../../public/images/${logo}.png`)} alt="Description of the image" className="responsive-img center" />}
                            </div>


                            {logo === 'logo' &&
                                <div className="address">
                                    {/* <Typography variant="body2">B-3 GIRIRAJ CO OP H S LTD, 6 MAMLATDAR WADI RAOD NO. 6 MALAD (WEST), MUMBAI - 400 064.</Typography> */}
                                    <Typography variant="body2">504, SYNERGY, KACH PADA RD NO. 2, NEAR MALAD IND. ESTATE, RAMCHANDRA LANE EXTENTION, MALAD (W), MUMBAI - 400 064.</Typography>
                                    <Typography variant="body2">PHONE NO: 022 2880 2452 | MOBILE NO: +91 99200 10200 / 99200 90200</Typography>
                                    <Typography variant="body2">Email: kashyap.seedsnfeeds@gmail.com | Pan No. AFRPC6408E </Typography>
                                    <Typography variant="body2"><b>GSTIN: 27AFRPC6408E1ZI</b></Typography>
                                </div>
                            }


                            {logo === 'agro' &&
                                <div className="address">
                                    <Typography variant="body2">504, SYNERGY, KACH PADA RD NO. 2, NEAR MALAD IND. ESTATE, RAMCHANDRA LANE EXTENTION, MALAD (W), MUMBAI - 400 064.</Typography>
                                    <Typography variant="body2">Tel. : 022 2880 2452</Typography>
                                    <Typography variant="body2">Email : meghnaagrocommodities@gmail.com | PAN No. : ABRPC6999E</Typography>
                                </div>
                            }


                            {logo === 'bombay' &&
                                <div className="address">
                                    <Typography variant="body2">504, SYNERGY, KACH PADA RD NO. 2, NEAR MALAD IND. ESTATE, RAMCHANDRA LANE EXTENTION, MALAD (W), MUMBAI - 400 064.</Typography>
                                    <Typography variant="body2">Tel. : 022 2880 2683 / 2880 3920 | Cell : +91 98200 10200 / 93200 10200</Typography>
                                    <Typography variant="body2">Email : kashyap.seedsnfeeds@gmail.com | PAN No. : AAAPC7200L</Typography>
                                    <Typography variant="body2">GSTIN : 27AAAPC7200L1Z2</Typography>
                                </div>
                            }

                            {logo === 'meghna' &&
                                <div className="address">
                                    <Typography variant="body2">504, SYNERGY, KACH PADA RD NO. 2, NEAR MALAD IND. ESTATE, RAMCHANDRA LANE EXTENTION, MALAD (W), MUMBAI - 400 064.</Typography>
                                    <Typography variant="body2">Tel. : 022 2880 2452-Fax : 022 2881 5002</Typography>
                                    <Typography variant="body2">Email : kashyap.seedsnfeeds@gmail.com | PAN No. : AFRPC6408E</Typography>
                                    <Typography variant="body2">GSTIN : 27AFRPC6408E1ZI</Typography>
                                </div>
                            }

                            <div className="contract-box">
                                <div>
                                    <Typography variant="body2">
                                        <b>CONTRACT NO : </b> <b>{contentData.contract_no}</b>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="body2">                                        
                                        <b>DATE : </b> <b>{customFormatDate(contentData.formikValues.createdDate ? new Date(contentData.formikValues.createdDate) : new Date())}</b>
                                    </Typography>
                                </div>
                            </div>

                            <div className="under-paragraph">
                                <Typography variant="body2">
                                    Under your instruction and order, we hereby confirm on behalf and risk of the under mentioned Seller and Buyer the following transaction with terms & conditions.
                                </Typography>
                            </div>

                            <div className="detail-wrapper contract-detail-wrapper">

                                {
                                    sellerData &&
                                    <>
                                        <div className="column"><Typography variant="body1" component="article"><b>Seller</b></Typography></div>
                                        <div className="column">
                                            <Typography variant="body2" component="article">
                                                <b>{sellerData.name}</b> <br />
                                                {sellerData.address}   <br />
                                                PAN : {sellerData.pan} <br />
                                                GSTIN : {sellerData.gstin} <br />
                                            </Typography>
                                        </div>
                                    </>
                                }

                                {
                                    buyerData &&
                                    <>
                                        <div className="column"><Typography variant="body1" component="article"><b>Buyer</b></Typography></div>
                                        <div className="column"><Typography variant="body2" component="article">
                                            <b>{buyerData.name}</b> <br />
                                            {buyerData.address} <br />
                                            PAN : {buyerData.pan} <br />
                                            GSTIN : {buyerData.gstin}
                                        </Typography></div>
                                    </>
                                }


                                {
                                    contentData.formikValues &&
                                    <>
                                        <div className="column"><Typography variant="body1" component="article"><b>Quantity</b></Typography></div>
                                        <div className="column"><Typography variant="body2" component="article"><span>{contentData.formikValues.quantity}</span></Typography></div>
                                    </>
                                }


                                {
                                    contentData.formikValues &&
                                    <>
                                        <div className="column"><Typography variant="body1" component="article"><b>Price</b></Typography></div>
                                        <div className="column"><Typography variant="body2" component="article"><span><pre>Rs {contentData.formikValues.price}</pre></span></Typography></div>
                                    </>
                                }


                                {contentData.selectedTemplate && Object.entries(contentData.selectedTemplate).filter(([key]) => key !== '_id' && key !== '__v' && key !== 'isDeleted' && key !== 'updatedDate' && key !== 'deletedDate' && key !== 'createdDate').map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <div className="column"><Typography variant="body1" component="article"><b>{key.charAt(0).toUpperCase() + key.slice(1)}</b></Typography></div>
                                        <div className="column"><Typography variant="body2" component="article"><span>{value as string}</span></Typography></div>
                                    </React.Fragment>
                                ))}





                                {contentData.labelFields && Object.entries(contentData.labelFields).filter(([key]) => key !== '_id' && key !== '__v' && key !== 'isDeleted' && key !== 'updatedDate' && key !== 'deletedDate' && key !== 'createdDate').map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <div className="column"><Typography variant="body1" component="article"><b>{key.charAt(0).toUpperCase() + key.slice(1)}</b></Typography></div>
                                        <div className="column"><Typography variant="body2" component="article"><span>{value as string}</span></Typography></div>
                                    </React.Fragment>
                                ))}
                            </div>


                            <div className="footer-subject">
                                <Typography variant="body2">
                                    Subject to Mumbai Jurisdiction
                                </Typography>
                            </div>

                            <div className="footer-seed-feed">
                                <Typography variant="body2">
                                    <b>For SEEDS & FEEDS VYANAH</b>
                                </Typography>
                            </div>

                            <div className="footer-buyer-seller">
                                <div>
                                    <Typography variant="body2"><b>FOR SELLER</b></Typography>
                                </div>
                                <Image src={require(`../../public/images/signature.jpg`)} alt="Signature" className="signature-img" />
                                <div>
                                    <Typography variant="body2"><b>FOR BUYER</b></Typography>
                                </div>
                            </div>

                            <div className="footer-seed-feed">
                                <Typography variant="body2">
                                    <b>(AS BROKER)</b>
                                </Typography>
                            </div>

                        </div>

                    </DialogContent>
                }

                <DialogActions>
                    <div className="preview-pop-ok-btn">
                        <Button onClick={handleClose} variant="outlined" fullWidth>Ok</Button>
                    </div>
                </DialogActions>
            </Dialog>        
    );
}

export default React.memo(Index);