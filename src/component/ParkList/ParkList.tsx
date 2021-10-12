import * as React from "react";
import Card from "../Card/Card";
import './ParkListStyle.css'
import Button from "../Button/Button";
import {
    Modal,
    TextField,
    FormControl,
    Grid,
    Typography,
    LinearProgress,
    CardActions,
    CardActionArea,
    CardContent,
    Card as MaterialCard,
    Button as MaterialButton,
    CardMedia,
    Chip,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoreParkListAction, getParkListAction, toggleParkLike } from "../../store/actions/ParkActions";
import {IRootReducer} from "../../store/reducers";
import Carousel from 'react-material-ui-carousel'
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import LikeIcon from '@material-ui/icons/Favorite'
import DisLikeIcon from '@material-ui/icons/FavoriteBorder'
import {IActivity, IEntranceFees, IPark} from "../../store/interface/ParkReducerInterface";

/**
 * Search Category List Interface
 */
interface ISearchCategory {
    label: string;
    value: string;
}

/**
 * Search By Category List
 */
const searchCategoryList: ISearchCategory[] = [
    { label: 'US State Code', value: 'stateCode' },
    { label: 'Park Code', value: 'parkCode' },
]


const ParkList = (props: any) => {

    /**
     * Dispatch for dispatching actions
     */
    const dispatch = useDispatch();

    /**
     * ParkList Reducer selector
     */
    const parkListReducer = useSelector((state: IRootReducer) => state.productReducer.parkList)

    /**
     * Search state
     */
    const [ search, setSearch ] = useState<string>('')

    /**
     * Modal visible state
     */
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);

    /**
     * Selected park state
     */
    const [ selectedPark, setSelectedPark ] = useState<IPark | null>(null);

    /**
     * Selected Search Category
     */
    const [ searchCategory, setSearchCategory ] = useState<string>(searchCategoryList[0].value)


    /**
     * UseEffect to fetch all parks on didMount
     */
    useEffect(() => {
        dispatch(getParkListAction())
    }, [dispatch]);

    /**
     * search parks
     */
    const searchParks = () => {
        dispatch(getParkListAction({[searchCategory]: search.split(",")}))
    };

    /**
     * Load more park list handler
     */
    const loadMore = () => {
        if (shouldLoadMore()) {
            dispatch(getMoreParkListAction({start: parkListReducer?.limit.toString()}))
        }
    }

    const shouldLoadMore = () => {
        if (parkListReducer?.total) {
            return +parkListReducer?.limit <= +parkListReducer?.total
        }
    }

    /**
     * Selected park handler
     * @param park
     */
    const viewPark = (park: IPark) => {
        setSelectedPark(park);
        setModalVisible(true)
    }

    /**
     * Modal close handler
     */
    const modalClose = () => {
        setModalVisible(false)
        setSelectedPark(null)
    }

    /**
     * Like and DisLike toggle
     */
    const doLikeDisLike = () => {
        if (selectedPark) {
            dispatch(toggleParkLike(selectedPark))
        }
    }

    return (
        <div className={"listContainer"}>
            <Card title={"Parks Seeker"} variant={'h4'} align={'left'}>
                <Grid container spacing={4} justify={'center'}>
                    <Grid item md={4}>
                        <FormControl fullWidth={true} margin={'dense'}>
                            <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={searchCategory}
                                onChange={(event: React.ChangeEvent<any>) => setSearchCategory(event.target.value)}
                            >
                                {searchCategoryList.map((search: ISearchCategory) => {
                                    return <MenuItem value={search.value}>{search.label}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth={true} margin={'dense'}>
                            <TextField
                                label="Search Parks"
                                value={search}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={2} justify={'center'} alignItems={'center'}>
                        <Button
                            label={"Search"}
                            onClick={searchParks}
                            variant={"outlined"}
                            color={'primary'}
                            size={'medium'}
                        />
                    </Grid>
                </Grid>
            </Card>
                <Grid container spacing={3}>
                {parkListReducer && parkListReducer.data && parkListReducer.data.map((park: IPark) => {
                    return <Grid item md={6} sm={12} lg={6} key={park.parkCode}>
                        <MaterialCard>
                                {park.images.length > 0 &&
                                <CardMedia
                                    className={'parkCardImage'}
                                    image={park.images[0].url}
                                    title="Contemplative Reptile"
                                />}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {park.name} - {park.states}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {park.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <CustomAccordion label={'Activities:'}>
                                        <Typography>
                                            {park.activities.map((activity: IActivity) => {
                                                return <Chip className={'Chip main'} label={activity.name} variant="outlined" />
                                            })}
                                        </Typography>
                                    </CustomAccordion>
                                </CardContent>
                            <CardActions>
                                <MaterialButton size="small" color="primary" onClick={() => viewPark(park)}>
                                    View Details
                                </MaterialButton>
                            </CardActions>
                        </MaterialCard>
                        </Grid>
                })}
                    <Grid item md={12} sm={12} lg={12}>
                        {parkListReducer && parkListReducer?.loading && <LinearProgress />}
                        {parkListReducer && parkListReducer?.error && <Typography>{parkListReducer?.error}</Typography>}
                        {!parkListReducer?.loading && !parkListReducer?.error && shouldLoadMore() && <Button label={'Load More'} variant={'outlined'} color={"primary"} size={"large"} onClick={loadMore}/>}
                    </Grid>
                </Grid>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={modalVisible}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                style={{
                    display: 'absolute',
                    top: 20,
                    left: '30vw',
                    right: '30vw',
                    width: '40vw',
                }}
                onClose={modalClose}
            >
                <MaterialCard>
                    {selectedPark && (
                    <CardActionArea>
                        <Carousel>
                            {selectedPark.images.map((item: any, i: number) => <CardMedia
                                className={'parkCardImage'}
                                image={item.url}
                                title="Contemplative Reptile"
                            /> )}
                        </Carousel>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {selectedPark.name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <CustomAccordion label={'Operating Hours:'}>
                                {Object.keys(selectedPark.operatingHours[0].standardHours).map((key: string) => {
                                    return <Chip className={'Chip'} label={`${key} - ${selectedPark.operatingHours[0].standardHours[key]}`} variant="outlined" />
                                })}
                            </CustomAccordion>
                            <CustomAccordion label={'Entrance Fees:'}>
                                <div className={'AccordionScrollContainer'}>
                                    {selectedPark.entranceFees && selectedPark.entranceFees.map((fees: IEntranceFees) => {
                                        return <Chip className={'Chip'} label={`${fees.title} - ${fees.cost}`} variant="outlined" />
                                    })}
                                </div>
                            </CustomAccordion>
                            <CustomAccordion label={'Contact Details:'}>
                                <Typography> Email:- {selectedPark.contacts.emailAddresses[0].emailAddress}<br/>
                                 Phone:- {selectedPark.contacts.phoneNumbers[0].phoneNumber}</Typography>
                            </CustomAccordion>
                            <CustomAccordion label={'Activities:'}>
                                    <div className={'AccordionScrollContainer'}>
                                        {selectedPark.activities.map((activity: IActivity) => {
                                            return <Chip className={'Chip'} label={activity.name} variant="outlined" />
                                        })}
                                    </div>
                            </CustomAccordion>
                            <CardContent>
                                <Typography> Location:- <a href={`https://www.google.co.in/maps/@${selectedPark.latitude},${selectedPark.longitude},14z?hl=en`} rel="noreferrer" target="_blank"> View </a></Typography>
                            </CardContent>
                        </CardContent>
                    </CardActionArea>
                    )}
                    <CardActions>
                        <MaterialButton size="small" color="primary" onClick={doLikeDisLike}>
                            {selectedPark?.like ? <LikeIcon /> : <DisLikeIcon />}
                        </MaterialButton>
                    </CardActions>
                </MaterialCard>
            </Modal>
        </div>
    );
}

export default ParkList;
