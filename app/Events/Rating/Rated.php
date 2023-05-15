<?php


namespace App\Events\Rating;


use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

/**
 * Class Rated
 * @package App\Events\Rating
 */
class Rated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var
     */
    public $data;

    /**
     * Rated constructor.
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @return array|Channel|Channel[]
     */
    public function broadcastOn()
    {
        $channel = 'singer-' . $this->data['singer_id'] . '-rated';

        return new Channel($channel);
    }

    /**
     * @return string
     */
    public function broadcastAs()
    {
        return 'singer-rated';
    }
}
