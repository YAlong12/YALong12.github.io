// Unregister from an event
router.delete('/:eventId/register', auth, async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id;

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Remove user from event's registrations
        event.registrations = event.registrations.filter(
            registration => registration.userId.toString() !== userId
        );
        await event.save();

        // Remove event from user's registrations
        const user = await User.findById(userId);
        user.registeredEvents = user.registeredEvents.filter(
            id => id.toString() !== eventId
        );
        await user.save();

        res.json({ success: true, message: 'Successfully unregistered from event' });
    } catch (error) {
        console.error('Error unregistering from event:', error);
        res.status(500).json({ message: 'Error unregistering from event' });
    }
});

// Register for an event
router.post('/:eventId/register', auth, async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id;

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: 'Event not found' 
            });
        }

        // Check if user is already registered
        const isRegistered = event.registrations.some(
            registration => registration.userId.toString() === userId
        );

        if (isRegistered) {
            return res.status(400).json({ 
                success: false, 
                message: 'Already registered for this event' 
            });
        }

        // Add user to event's registrations
        event.registrations.push({
            userId,
            registeredAt: new Date()
        });
        await event.save();

        // Add event to user's registrations
        const user = await User.findById(userId);
        if (!user.registeredEvents) {
            user.registeredEvents = [];
        }
        user.registeredEvents.push(eventId);
        await user.save();

        res.json({ 
            success: true, 
            message: 'Successfully registered for event' 
        });
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error registering for event' 
        });
    }
}); 