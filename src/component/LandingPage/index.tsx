import React, { FC } from 'react'
import Button from '../Button/Button'
import SearchIcon from '@material-ui/icons/Search';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import './style.css'
import Card from "../Card/Card";

/**
 * Landing Page
 * @param props
 */
const LandingPage: FC = (props: any) => {
    return (
        <div className={'landingContainer'}>
            <Card title={"Parks Seeker"}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<SearchIcon />}
                    label={"Search Parks"}
                    onClick={() => props.history.push('/list')}
                    align={'center'}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<AnnouncementIcon />}
                    label={"Parks News"}
                    onClick={() => props.history.push('/news')}
                    align={'center'}
                />
            </Card>
        </div>
    )
}

export default LandingPage;
